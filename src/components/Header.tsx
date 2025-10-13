import React from 'react';
import MaycoleTrackerIconButton from './MaycoleTrackerIconButton';
import UniversalBackButton from './UniversalBackButton';

const Header: React.FC = () => {
  return (
    <header className="app-header">
      <div className="header-inner">
        <UniversalBackButton customBackPath="/logo" showHomeOption={false} />
        <MaycoleTrackerIconButton size={28} onClick={() => { /* noop */ }} title="MaycoleTracker" />
      </div>
    </header>
  );
};

export default Header;
