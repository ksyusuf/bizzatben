import React from 'react';
import { CalendarIcon, BuildingOfficeIcon, KeyIcon } from '@heroicons/react/24/outline';

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
  certificate
}) => {
  const { truncatedDescriptionText, isTruncated } = truncateDescription(certificate.description, 150);
  const expired = isExpired(certificate.expiryDate);
  const [showFullDescription, setShowFullDescription] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const displayCredentialId =
    certificate.credentialId.length > 10
      ? `${certificate.credentialId.slice(0, 10)}...`
      : certificate.credentialId;

  const handleCopyCredentialId = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(certificate.credentialId);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = certificate.credentialId;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error('Credential ID kopyalanırken hata oluştu:', error);
    }
  };

  return (
    <div
      className="relative overflow-hidden rounded-2xl border hover:scale-105 transition-all duration-300"
    >
        {certificate.image && (
          <div className="relative aspect-w-16 aspect-h-9 overflow-hidden flex items-center justify-center">
            <img
              src={certificate.image}
              alt={certificate.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t to-transparent"></div>
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

        {/* Issuer, Date and Credential ID */}
        <div className="flex flex-col gap-1 mb-3 text-sm text-cyan-100">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1">
              <BuildingOfficeIcon className="h-4 w-4" />
              <span className="whitespace-nowrap">{certificate.issuer}</span>
            </div>
            <div className="flex items-center gap-1">
              <CalendarIcon className="h-4 w-4" />
              <span className="whitespace-nowrap">{formatDate(certificate.issueDate)}</span>
            </div>
          </div>

          {certificate.credentialId && certificate.credentialId !== '' && (
            <div className="flex items-center gap-1 relative">
              <KeyIcon className="h-4 w-4" />
              {certificate.credentialUrl && 
               certificate.credentialUrl !== '' && 
               (certificate.credentialUrl.startsWith('http://') || certificate.credentialUrl.startsWith('https://')) ? (
                <a
                  href={certificate.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="max-w-[180px] truncate underline underline-offset-2 hover:text-blue-300 transition-colors duration-200"
                >
                  {displayCredentialId}
                </a>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handleCopyCredentialId}
                    className="max-w-[180px] truncate text-left underline underline-offset-2 hover:text-blue-300 transition-colors duration-200 cursor-pointer bg-transparent border-none p-0"
                  >
                    {displayCredentialId}
                  </button>
                  {copied && (
                    <div
                      className="absolute left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs px-3 py-1 rounded-full shadow-lg"
                      style={{ bottom: 'calc(100% + 5px)' }}
                    >
                      Copied
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        <p className="mb-4 text-sm">
          {showFullDescription ? certificate.description : truncatedDescriptionText}
          {isTruncated && (
            <button
              onClick={() => setShowFullDescription((prev) => !prev)}
              className="ml-1 text-blue-100 underline decoration-2 underline-offset-2 hover:text-blue-300 transition-colors duration-200 cursor-pointer bg-transparent border-none p-0"
            >
              {showFullDescription ? 'Daha az göster' : 'Devamını oku'}
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
