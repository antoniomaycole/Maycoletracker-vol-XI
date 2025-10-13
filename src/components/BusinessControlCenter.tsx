/**
 * MaycoleTracker™ vol. XI - Business Control Center
 * Main dashboard with everything at your fingertips for effective business management
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Package, Settings, Info, Building2, BarChart3, Camera, 
  Calculator, FileText, Users, DollarSign, Globe, 
  Zap, Shield, TrendingUp, Home,
  PlayCircle, CheckCircle, AlertCircle, Clock,
  ArrowRight, Plus, Search, Menu, X
} from 'lucide-react';
import Layout from './Layout';
import Header from './Header';
import IndustryBar from './IndustryBar';
import InventoryTable from './InventoryTable';
import { fetchItems, addItem, generateReport } from '../services/inventoryService';
import AddProduct from './AddProduct';
import ReportModal from './ReportModal';
// consolidated react imports above

export default function BusinessControlCenter() {
  const navigate = useNavigate();
  const [showQuickMenu, setShowQuickMenu] = useState(false);
  const [inventoryAiStatus, setInventoryAiStatus] = useState<{ lastRun?: string; autoManage?: boolean }>({});

  // AgentBus subscriptions were removed per the user's instruction to simplify
  // the second page. Re-introduce telemetry subscriptions only when the
  // AgentBus is intentionally wired into this page.

  // Industry options for quick access
  const industries = [
    { id: 'healthcare', name: 'Healthcare', icon: '🏥', color: 'bg-red-500', route: '/setup/healthcare' },
    { id: 'restaurant', name: 'Restaurant', icon: '🍽️', color: 'bg-orange-500', route: '/setup/restaurant' },
    { id: 'construction', name: 'Construction', icon: '🏗️', color: 'bg-yellow-500', route: '/setup/construction' },
    { id: 'retail', name: 'Retail', icon: '🛍️', color: 'bg-green-500', route: '/setup/retail' },
    { id: 'manufacturing', name: 'Manufacturing', icon: '🏭', color: 'bg-blue-500', route: '/setup/manufacturing' },
    { id: 'hospitality', name: 'Hospitality', icon: '🏨', color: 'bg-purple-500', route: '/setup/hospitality' },
    { id: 'education', name: 'Education', icon: '🎓', color: 'bg-indigo-500', route: '/setup/education' },
    { id: 'automotive', name: 'Automotive', icon: '🚗', color: 'bg-gray-500', route: '/setup/automotive' },
    { id: 'realestate', name: 'Real Estate', icon: '🏘️', color: 'bg-pink-500', route: '/setup/realestate' }
  ];

  // Core business modules
  // We keep the UI simple here — brand, key actions, and minimal quick links.
  const [items, setItems] = React.useState<any[]>([]);
  const [showAdd, setShowAdd] = React.useState(false);
  const [showReport, setShowReport] = React.useState(false);

  React.useEffect(() => {
    let mounted = true;
    fetchItems().then((res) => {
      if (mounted) setItems(res);
    });
    return () => { mounted = false; };
  }, []);

  const handleAdd = async (item: any) => {
    const created = await addItem(item);
    setItems((s) => [created, ...s]);
  };

  const handleGenerateReport = async () => {
    // navigate to a dedicated report page
    navigate('/report');
  };

  return (
    <Layout>
      <div className="min-h-screen bcc-background">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-10">
          <div className="text-center mb-6">
            <h1 className="perfect-title-fitted">MaycoleTracker</h1>
            <p className="perfect-subtitle">WORLD'S FIRST UNIVERSAL BUSINESS MANAGEMENT PLATFORM</p>
          </div>

          <IndustryBar
            onSelectIndustry={(name) => {
              const route = `/setup/${encodeURIComponent(name.toLowerCase().replace(/\s+/g, ''))}`;
              navigate(route);
            }}
            onMore={(name) => navigate(`/explore/${encodeURIComponent(name.toLowerCase().replace(/\s+/g, ''))}`)}
          />

          <div className="flex gap-3 justify-center mt-6">
            <button onClick={() => setShowAdd(true)} className="px-4 py-2 bg-white text-blue-700 rounded-md font-medium">Add Product</button>
            <button onClick={handleGenerateReport} className="px-4 py-2 bg-white text-blue-700 rounded-md font-medium">Get Report</button>
          </div>

          <div className="mt-8">
            <InventoryTable items={items} />
          </div>
        </div>
      </div>
  {showAdd && <AddProduct onAdd={handleAdd} onClose={() => setShowAdd(false)} />}
    </Layout>
  );
}