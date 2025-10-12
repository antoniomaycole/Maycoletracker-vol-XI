import os
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from datetime import datetime

app = Flask(__name__)

# Config from environment
DB_URL = os.environ.get('DATABASE_URL', 'sqlite:///maycoletracker.db')
app.config['SQLALCHEMY_DATABASE_URI'] = DB_URL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'change-me-in-prod')

db = SQLAlchemy(app)
migrate = Migrate(app, db)

from . import models


@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'timestamp': datetime.utcnow().isoformat()})


@app.route('/api/items', methods=['GET'])
def list_items():
    items = models.InventoryItem.query.filter_by(active=True).all()
    return jsonify([i.to_dict() for i in items])


@app.route('/api/items', methods=['POST'])
def create_item():
    payload = request.json or {}
    item = models.InventoryItem(
        sku=payload.get('sku'),
        name=payload.get('name'),
        description=payload.get('description'),
        unit=payload.get('unit', 'unit'),
        reorder_point=payload.get('reorderPoint', 0),
        lead_time_days=payload.get('leadTimeDays', 0),
        industry_id=payload.get('industryId'),
        active=True,
    )
    db.session.add(item)
    db.session.commit()
    return jsonify(item.to_dict()), 201


@app.route('/api/stock', methods=['POST'])
def create_stock_entry():
    payload = request.json or {}
    entry = models.StockEntry(
        item_id=payload.get('itemId'),
        quantity=payload.get('quantity', 0),
        unit=payload.get('unit', 'unit'),
        lot_id=payload.get('lot', {}).get('lotId') if payload.get('lot') else None,
        manufacture_date=payload.get('lot', {}).get('manufactureDate') if payload.get('lot') else None,
        expiry_date=payload.get('lot', {}).get('expiryDate') if payload.get('lot') else None,
        location_id=payload.get('locationId'),
        received_at=datetime.utcnow(),
        unit_cost=payload.get('unitCost'),
        source=payload.get('source'),
    )
    db.session.add(entry)
    db.session.commit()
    return jsonify(entry.to_dict()), 201


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
