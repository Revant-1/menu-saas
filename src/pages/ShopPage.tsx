import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { 
  Menu, 
  Instagram, 
  Facebook, 
  Star, 
  DollarSign, 
  Phone, 
  MapPin, 
  Clock, 
  ChefHat, 
  Search,
  Twitter,
  Youtube,
  Globe,
  Linkedin
} from 'lucide-react';
import { useShop } from '../contexts/ShopContext';
import MenuSection from '../components/MenuSection';
import LinkButton from '../components/LinkButton';
import TikTokIcon from '../components/icons/TikTokIcon';

function ShopPage() {
  const { shopId } = useParams();
  const { getShopById } = useShop();
  const shop = shopId ? getShopById(shopId) : undefined;
  const [searchTerm, setSearchTerm] = useState('');

  if (!shop) {
    return <Navigate to="/404" replace />;
  }

  const theme = shop.theme || {
    primary: '#4A5568',
    secondary: '#F7FAFC',
    accent: '#ED8936',
    background: 'from-gray-50 to-gray-100',
    text: '#2D3748'
  };

  const socialIcons = [
    { key: 'instagram', icon: Instagram, url: shop.social.instagram },
    { key: 'facebook', icon: Facebook, url: shop.social.facebook },
    { key: 'twitter', icon: Twitter, url: shop.social.twitter },
    { key: 'youtube', icon: Youtube, url: shop.social.youtube },
    { key: 'tiktok', icon: TikTokIcon, url: shop.social.tiktok },
    { key: 'linkedin', icon: Linkedin, url: shop.social.linkedin },
    { key: 'website', icon: Globe, url: shop.social.website },
    { key: 'reviews', icon: Star, url: shop.social.reviews },
  ].filter(social => social.url);

  return (
    <div className={`min-h-screen bg-gradient-to-b ${theme.background}`}>
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden shadow-lg ring-4" style={{ borderColor: theme.primary }}>
            <img 
              src={shop.imageUrl}
              alt={shop.name}
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-4xl font-bold mb-2" style={{ color: theme.primary }}>{shop.name}</h1>
          <p className="text-lg mb-4" style={{ color: theme.text }}>{shop.description}</p>
          
          {/* Quick Info */}
          <div className="flex justify-center space-x-6 mb-6">
            <span className="flex items-center" style={{ color: theme.text }}>
              <Clock className="w-5 h-5 mr-2" style={{ color: theme.accent }} /> {shop.hours}
            </span>
            <span className="flex items-center" style={{ color: theme.text }}>
              <ChefHat className="w-5 h-5 mr-2" style={{ color: theme.accent }} /> {shop.established}
            </span>
          </div>
        </div>

        {/* Social Links */}
        {socialIcons.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {socialIcons.map(({ key, icon: Icon, url }) => (
              <a
                key={key}
                href={url}
                className="p-2 transition-transform hover:scale-110"
                style={{ color: key === 'reviews' ? theme.accent : theme.primary }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon className="w-7 h-7" />
              </a>
            ))}
          </div>
        )}

        {/* Primary Actions */}
        <div className="space-y-4 mb-8">
          <LinkButton 
            icon={<Menu />}
            text="View Full Menu"
            href="#menu"
            primary
            color={theme.primary}
          />
          {shop.orderUrl && (
            <LinkButton 
              icon={<DollarSign />}
              text="Order Online"
              href={shop.orderUrl}
              color={theme.accent}
            />
          )}
          {shop.locationUrl && (
            <LinkButton 
              icon={<MapPin />}
              text="Get Directions"
              href={shop.locationUrl}
              color={theme.accent}
            />
          )}
          {shop.phone && (
            <LinkButton 
              icon={<Phone />}
              text="Call Us"
              href={`tel:${shop.phone}`}
              color={theme.accent}
            />
          )}
        </div>

        {/* Menu Preview */}
        <div id="menu" className="rounded-2xl shadow-lg p-8 mb-8" style={{ backgroundColor: theme.secondary }}>
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: theme.primary }}>Our Menu</h2>
          
          {/* Search Bar */}
          <div className="relative mb-8">
            <input
              type="text"
              placeholder="Search menu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 rounded-lg border focus:outline-none focus:ring-2 transition-all"
              style={{ 
                borderColor: theme.primary,
                backgroundColor: 'white',
                color: theme.text,
                focusRing: theme.primary 
              }}
            />
            <Search 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
              style={{ color: theme.primary }}
            />
          </div>

          {Object.entries(shop.menu).map(([category, items]) => (
            <MenuSection 
              key={category} 
              category={category} 
              items={items}
              theme={theme}
              searchTerm={searchTerm}
              defaultExpanded={true}
            />
          ))}
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 pb-8">
          <p style={{ color: theme.text }}>© 2024 {shop.name}. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default ShopPage;