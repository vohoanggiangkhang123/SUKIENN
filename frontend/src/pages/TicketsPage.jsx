import React, { useState } from 'react';

const TicketsPage = ({ setActiveView }) => {
  const [activeTab, setActiveTab] = useState('recent');

  const tickets = [
    {
      id: 1,
      name: 'Metropolitan Opera: Night Cycle',
      sub: 'VIP Premium Ticket',
      date: 'Oct 24, 2023',
      time: '08:00 PM EST',
      venue: 'Lincoln Center',
      status: 'active'
    },
    {
      id: 2,
      name: 'Modernist Architecture Symposium',
      sub: 'General Admission',
      date: 'Nov 02, 2023',
      time: '10:00 AM EST',
      venue: 'The Glass Pavilion',
      status: 'active'
    },
    {
      id: 3,
      name: 'Abstract Expressionism: Private View',
      sub: 'LIMITED GUEST LIST',
      date: 'Nov 15, 2023',
      time: '06:30 PM EST',
      venue: 'MoMA Annex',
      status: 'active'
    },
    {
      id: 4,
      name: 'Neo-Jazz Quartet Live',
      sub: 'Standard Seating',
      date: 'Dec 01, 2023',
      time: '09:00 PM EST',
      venue: 'The Blue Note',
      status: 'active'
    }
  ];

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      {/* Content Header */}
      <div className="content-header">
        <div className="search-bar-wrap">
          <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input type="text" placeholder="Search events..." />
        </div>

        <div className="header-tabs">
          {['Recent', 'Upcoming', 'Past'].map((tab) => (
            <button
              key={tab}
              className={`header-tab ${activeTab === tab.toLowerCase() ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.toLowerCase())}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="user-profile">
          <button className="notif-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
          </button>
          <div className="user-info">
            <div className="user-name">Alex Rivera</div>
            <div className="user-tag">PRO ACCOUNT</div>
          </div>
          <img className="user-avatar" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100" alt="Avatar" />
        </div>
      </div>

      {/* Main Tickets Section */}
      <div className="tickets-heading-area">
        <div className="verified-tag">VERIFIED ACCESS</div>
        <h1 className="page-title">My Tickets</h1>
        <p className="page-subtitle">Management of your secured entries. High-precision ticketing for curated experiences across the metropolitan area.</p>
      </div>

      <div className="tickets-table-card">
        <div className="table-header">
          <div className="table-col-label">EVENT DETAILS</div>
          <div className="table-col-label">SCHEDULE</div>
          <div className="table-col-label">VENUE</div>
          <div className="table-col-label" style={{ textAlign: 'right', paddingRight: '20px' }}>ACTION</div>
        </div>

        <div className="ticket-list">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="ticket-row">
              <div className="ticket-main">
                <div className="status-indicator"></div>
                <div>
                  <div className="ticket-name">{ticket.name}</div>
                  <div className="ticket-sub">{ticket.sub}</div>
                </div>
              </div>
              <div className="ticket-schedule">
                <div className="sched-date">{ticket.date}</div>
                <div className="sched-time">{ticket.time}</div>
              </div>
              <div className="ticket-venue">{ticket.venue}</div>
              <div className="ticket-actions">
                <button className="btn-check-in">Check-in</button>
                <button className="btn-view-ticket-small">View Ticket</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Row */}
      <div className="summary-row">
        <div className="summary-card">
          <div className="summ-label">TOTAL VALUE</div>
          <div className="summ-value">$1,240.00</div>
          <div className="summ-meta positive">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ marginRight: '4px' }}>
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
            </svg>
            12% VS LAST MONTH
          </div>
        </div>

        <div className="summary-card">
          <div className="summ-label">UPCOMING ENTRIES</div>
          <div className="summ-value">4 Events</div>
          <div className="summ-meta">Next: Lincoln Center in 2 days</div>
        </div>

        <div className="scanner-ready-card">
          <div>
            <div className="scan-title">SCANNER READY</div>
            <div className="scan-status">Ready for Entry</div>
          </div>
          <div className="scan-icon-wrap">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 7V5a2 2 0 0 1 2-2h2" /><path d="M17 3h2a2 2 0 0 1 2 2v2" /><path d="M21 17v2a2 2 0 0 1-2 2h-2" /><path d="M7 21H5a2 2 0 0 1-2-2v-2" /><circle cx="12" cy="12" r="3" /><path d="M16 12h2M6 12h2M12 16h2M12 6h2" />
            </svg>
          </div>
        </div>
      </div>

      {/* Floating Button */}
      <button className="btn-quick-scan" onClick={() => setActiveView('scanner')}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 7V5a2 2 0 0 1 2-2h2" /><path d="M17 3h2a2 2 0 0 1 2 2v2" /><path d="M21 17v2a2 2 0 0 1-2 2h-2" /><path d="M7 21H5a2 2 0 0 1-2-2v-2" /><path d="M12 8v8M8 12h8" />
        </svg>
        Quick Scan
      </button>
    </div>
  );
};

export default TicketsPage;
