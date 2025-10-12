from .app import db
from datetime import datetime
import uuid


def gen_uuid():
    return str(uuid.uuid4())


class InventoryItem(db.Model):
    __tablename__ = 'inventory_items'
    id = db.Column(db.String, primary_key=True, default=gen_uuid)
    sku = db.Column(db.String, unique=True, nullable=False)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.Text)
    unit = db.Column(db.String, nullable=False, default='unit')
    reorder_point = db.Column(db.Float, default=0)
    lead_time_days = db.Column(db.Integer, default=0)
    industry_id = db.Column(db.String, index=True)
    active = db.Column(db.Boolean, default=True)

    def to_dict(self):
        return {
            'id': self.id,
            'sku': self.sku,
            'name': self.name,
            'description': self.description,
            'unit': self.unit,
            'reorderPoint': self.reorder_point,
            'leadTimeDays': self.lead_time_days,
            'industryId': self.industry_id,
            'active': self.active,
        }


class StockEntry(db.Model):
    __tablename__ = 'stock_entries'
    id = db.Column(db.String, primary_key=True, default=gen_uuid)
    item_id = db.Column(db.String, db.ForeignKey('inventory_items.id'), nullable=False)
    quantity = db.Column(db.Float, default=0)
    unit = db.Column(db.String, default='unit')
    lot_id = db.Column(db.String, index=True, nullable=True)
    manufacture_date = db.Column(db.Date, nullable=True)
    expiry_date = db.Column(db.Date, nullable=True)
    location_id = db.Column(db.String, nullable=True)
    received_at = db.Column(db.DateTime, default=datetime.utcnow)
    unit_cost = db.Column(db.Float, nullable=True)
    source = db.Column(db.String, nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'itemId': self.item_id,
            'quantity': self.quantity,
            'unit': self.unit,
            'lot': {
                'lotId': self.lot_id,
                'manufactureDate': self.manufacture_date.isoformat() if self.manufacture_date else None,
                'expiryDate': self.expiry_date.isoformat() if self.expiry_date else None,
            } if self.lot_id else None,
            'locationId': self.location_id,
            'receivedAt': self.received_at.isoformat() if self.received_at else None,
            'unitCost': self.unit_cost,
            'source': self.source,
        }


class Transaction(db.Model):
    __tablename__ = 'transactions'
    id = db.Column(db.String, primary_key=True, default=gen_uuid)
    type = db.Column(db.String, nullable=False)
    item_id = db.Column(db.String, db.ForeignKey('inventory_items.id'), nullable=False)
    quantity = db.Column(db.Float, default=0)
    unit = db.Column(db.String, default='unit')
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    performed_by = db.Column(db.String, nullable=True)
    reference = db.Column(db.String, nullable=True)
    note = db.Column(db.Text, nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'type': self.type,
            'itemId': self.item_id,
            'quantity': self.quantity,
            'unit': self.unit,
            'timestamp': self.timestamp.isoformat() if self.timestamp else None,
            'performedBy': self.performed_by,
            'reference': self.reference,
            'note': self.note,
        }


class AuditRecord(db.Model):
    __tablename__ = 'audit_records'
    id = db.Column(db.String, primary_key=True, default=gen_uuid)
    entity = db.Column(db.String, nullable=False)
    entity_id = db.Column(db.String, nullable=False)
    action = db.Column(db.String, nullable=False)
    performed_by = db.Column(db.String, nullable=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    before = db.Column(db.JSON, nullable=True)
    after = db.Column(db.JSON, nullable=True)
    reason = db.Column(db.String, nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'entity': self.entity,
            'entityId': self.entity_id,
            'action': self.action,
            'performedBy': self.performed_by,
            'timestamp': self.timestamp.isoformat() if self.timestamp else None,
            'before': self.before,
            'after': self.after,
            'reason': self.reason,
        }
