// src/pages/NotificationsPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Car, Plane, FileText, UserCheck, Receipt, CheckCheck, ArrowRight } from 'lucide-react';
import AppHeader from '../components/AppHeader.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import { useApp } from '../context/AppContext.jsx';

export default function NotificationsPage() {
  const navigate = useNavigate();
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = useApp();

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Car':
        return <Car className="w-4 h-4 text-[#F43F43]" />;
      case 'Plane':
        return <Plane className="w-4 h-4 text-emerald-600" />;
      case 'FileText':
        return <FileText className="w-4 h-4 text-blue-600" />;
      case 'UserCheck':
        return <UserCheck className="w-4 h-4 text-[#F43F43]" />;
      case 'Receipt':
        return <Receipt className="w-4 h-4 text-emerald-600" />;
      default:
        return <Bell className="w-4 h-4 text-[#F43F43]" />;
    }
  };

  // Group by 'Today', 'Yesterday', 'Earlier'
  const groups = ['Today', 'Yesterday', 'Earlier'];

  const handleNotificationClick = (notif) => {
    markNotificationAsRead(notif.id);
    if (notif.tripId) {
      navigate(`/trips/${notif.tripId}`);
    }
  };

  return (
    <div className="min-h-full pb-8 bg-[#f8f9fb]">
      {/* App Header */}
      <AppHeader title="Dispatch Alerts" showBack />

      {/* Hero Banner */}
      <div className="px-4 pt-3 pb-2 flex items-center justify-between">
        <div>
          <span className="text-[11px] font-semibold tracking-wider text-[#F43F43] uppercase block mb-0.5">
            Live Updates & Briefs
          </span>
          <h1 className="text-[28px] leading-[32px] font-display font-semibold text-[#101417]">
            Notifications
          </h1>
        </div>

        <button
          type="button"
          onClick={markAllNotificationsAsRead}
          className="text-[13px] text-[#F43F43] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
        >
          <CheckCheck className="w-3.5 h-3.5" />
          <span>Mark all read</span>
        </button>
      </div>

      <div className="px-4 mt-3 space-y-5">
        {groups.map((groupName) => {
          const itemsInGroup = notifications.filter(n => n.group === groupName);
          if (itemsInGroup.length === 0) return null;

          return (
            <div key={groupName}>
              <h3 className="text-[11px] font-sans font-bold uppercase tracking-wider text-slate-400 mb-2.5 px-1">
                {groupName}
              </h3>

              <div className="space-y-2.5">
                {itemsInGroup.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => handleNotificationClick(notif)}
                    className={`p-3.5 rounded-[16px] border transition-all cursor-pointer flex items-start gap-3 bg-white shadow-xs ${
                      !notif.read
                        ? 'border-[#F43F43]/40 ring-1 ring-[#F43F43]/20'
                        : 'border-[#E8E8EC] opacity-80 hover:opacity-100 hover:border-slate-300'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 mt-0.5 border border-[#E8E8EC]">
                      {getIcon(notif.icon)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <h4 className="text-[13px] font-semibold text-[#101417] truncate">
                          {notif.title}
                        </h4>
                        <span className="text-[11px] text-[#6B7075] shrink-0 font-medium">
                          {notif.time}
                        </span>
                      </div>
                      <p className="text-[12px] text-[#6B7075] leading-snug">
                        {notif.body}
                      </p>
                    </div>

                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-[#c8102e] shrink-0 mt-1.5" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {notifications.length === 0 && (
          <EmptyState
            title="No notifications"
            description="You are fully caught up with your trips and dispatch briefs."
            icon={Bell}
          />
        )}
      </div>
    </div>
  );
}
