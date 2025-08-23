import React from 'react';
import { CalendarIcon, BuildingOfficeIcon, DocumentIcon } from '@heroicons/react/24/outline';

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate: string | null;
  credentialId: string;
  credentialUrl: string;
  description: string;
  tags: { name: string; slug: string; }[];
  image?: string;
}

interface CertificateCardProps {
  certificate: Certificate;
  index: number;
  onViewDetails?: () => void;
}

const truncateDescription = (text: string, maxLength: number) => {
  if (text.length <= maxLength) {
    return { truncatedDescriptionText: text, isTruncated: false };
  }
  const truncated = text.substring(0, maxLength).trim();
  return { truncatedDescriptionText: truncated + '...', isTruncated: true };
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const isExpired = (expiryDate: string | null) => {
  if (!expiryDate) return false;
  return new Date(expiryDate) < new Date();
};

export const CertificateCard: React.FC<CertificateCardProps> = ({ 
  certificate, 
  onViewDetails 
}) => {
  const { truncatedDescriptionText } = truncateDescription(certificate.description, 150);
  const expired = isExpired(certificate.expiryDate);
  

  return (
    <div
      className="relative overflow-hidden rounded-2xl border hover:scale-105 transition-all duration-300"
    >
        {certificate.image && (
         <div className="relative h-35 md:h-40 lg:h-40 overflow-hidden flex items-center justify-center">
          <DocumentIcon className="h-15 w-15" />
           <div className="absolute inset-0 bg-gradient-to-t to-transparent">
           </div>
           {expired && (
             <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
               Süresi Dolmuş
             </div>
           )}
         </div>
       )}

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">
          {certificate.title}
        </h3>

        {/* Issuer and Date */}
        <div className="flex items-center gap-4 mb-3 text-sm text-cyan-100">
          <div className="flex items-center gap-1">
            <BuildingOfficeIcon className="h-4 w-4" />
            <span>{certificate.issuer}</span>
          </div>
          <div className="flex items-center gap-1">
            <CalendarIcon className="h-4 w-4" />
            <span>{formatDate(certificate.issueDate)}</span>
          </div>
        </div>

        <p className="mb-4 text-sm">
          {truncatedDescriptionText}
          {onViewDetails && (
            <button
              onClick={onViewDetails}
              className="ml-1 text-blue-100 underline decoration-2 underline-offset-2 hover:text-blue-300 transition-colors duration-200 cursor-pointer bg-transparent border-none p-0"
            >
              Devamını oku
            </button>
          )}
        </p>

        {/* Tags and Date */}
        <div className="flex justify-between items-end mb-4">
          <div className="flex flex-wrap gap-2">
            {certificate.tags.map((tag) => (
              <span
                key={tag.slug}
                className="px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors duration-200">
                {tag.name}
              </span>
            ))}
          </div>
          <div className="text-right text-gray-300">
            <span className="text-xs font-medium whitespace-nowrap">
              {formatDate(certificate.issueDate)}
            </span>
          </div>
        </div>

        
      </div>
    </div>
  );
};
