'use client';

import { useState } from 'react';
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';
import { FileUpload } from '@/components/ui/file-upload';

interface FormData {
  businessIdea: string;
  targetAudience: string;
  customAudience: string;
  uniqueValueProposition: string;
  uploads: File[];
}

const targetAudienceOptions = [
  'Small Businesses (1-50 employees)',
  'Medium Enterprises (51-500 employees)',
  'Large Corporations (500+ employees)',
  'Individual Consumers (B2C)',
  'Tech Startups',
  'E-commerce Businesses',
  'Healthcare Organizations',
  'Educational Institutions',
  'Non-profit Organizations',
  'Other (specify below)'
];

export default function InputPage() {
  const [formData, setFormData] = useState<FormData>({
    businessIdea: '',
    targetAudience: '',
    customAudience: '',
    uniqueValueProposition: '',
    uploads: []
  });
  const [files, setFiles] = useState<File[]>([]);
  const [showReview, setShowReview] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  // Lock states for each field
  const [lockedFields, setLockedFields] = useState({
    businessIdea: false,
    targetAudience: false,
    customAudience: false,
    uniqueValueProposition: false
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleInputBlur = (field: keyof typeof lockedFields, value: string) => {
    if (value.trim()) {
      setLockedFields(prev => ({
        ...prev,
        [field]: true
      }));
    }
  };

  const handleInputSubmit = (field: keyof typeof lockedFields, value: string) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
      setTimeout(() => {
        setLockedFields(prev => ({
          ...prev,
          [field]: true
        }));
      }, 500);
    }
  };

  const unlockField = (field: keyof typeof lockedFields) => {
    setLockedFields(prev => ({
      ...prev,
      [field]: false
    }));
  };

  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    setFormData(prev => ({
      ...prev,
      uploads: files
    }));
    console.log(files);
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      uploads: prev.uploads.filter((_, i) => i !== index)
    }));
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const isFormValid = () => {
    return formData.businessIdea.trim() && 
           formData.targetAudience && 
           formData.uniqueValueProposition.trim();
  };

  const handleSubmit = () => {
    if (isFormValid()) {
      console.log('Form submitted:', formData);
      // Navigate to results or show success message
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  if (showReview) {
    return (
      <div className="min-h-screen">
        <div className="max-w-3xl mx-auto p-6 sm:p-8">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-[#111827] mb-2">Review Your Information</h1>
            <p className="text-[#6B7280] text-lg">Please confirm your details before generating your strategy</p>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-[#FFFFFF] rounded-lg border border-[#E5E7EB] shadow-sm">
              <h3 className="font-semibold text-[#111827] mb-2">Business Idea</h3>
              <p className="text-[#6B7280]">{formData.businessIdea}</p>
            </div>

            <div className="p-4 bg-[#FFFFFF] rounded-lg border border-[#E5E7EB] shadow-sm">
              <h3 className="font-semibold text-[#111827] mb-2">Target Audience</h3>
              <p className="text-[#6B7280]">
                {formData.targetAudience}
                {formData.customAudience && ` - ${formData.customAudience}`}
              </p>
            </div>

            <div className="p-4 bg-[#FFFFFF] rounded-lg border border-[#E5E7EB] shadow-sm">
              <h3 className="font-semibold text-[#111827] mb-2">Unique Value Proposition</h3>
              <p className="text-[#6B7280]">{formData.uniqueValueProposition}</p>
            </div>

            {formData.uploads.length > 0 && (
              <div className="p-4 bg-[#FFFFFF] rounded-lg border border-[#E5E7EB] shadow-sm">
                <h3 className="font-semibold text-[#111827] mb-2">Uploaded Files</h3>
                <div className="space-y-1">
                  {formData.uploads.map((file, index) => (
                    <p key={index} className="text-[#6B7280] text-sm">{file.name}</p>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={() => setShowReview(false)}
              className="flex-1 px-6 py-3 border border-[#E5E7EB] text-[#6B7280] rounded-lg hover:bg-[#EEF2FF] transition-colors font-medium"
            >
              Back to Edit
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 px-6 py-3 bg-[#6366F1] text-white rounded-lg hover:bg-[#4F46E5] transition-colors font-medium"
            >
              Generate Strategy
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto p-6 sm:p-8">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-[#111827] mb-2">Business Strategy Generator</h1>
          <p className="text-[#6B7280] text-lg">Tell us about your business idea and we'll create a comprehensive strategy</p>
        </div>

        <div className="space-y-4">
          {/* Business Idea */}
          <div className="relative">
            <label className="block text-sm font-medium text-[#111827] mb-1">
              Business Idea *
            </label>
            <div className="relative">
              {lockedFields.businessIdea ? (
                <div className="w-full p-3 border border-[#E5E7EB] rounded-lg bg-[#FFFFFF] text-[#6B7280] flex items-center justify-between shadow-sm">
                  <span className="truncate">{formData.businessIdea || 'No content entered'}</span>
                  <button
                    type="button"
                    onClick={() => unlockField('businessIdea')}
                    className="ml-2 text-[#6366F1] hover:text-[#4F46E5] flex-shrink-0"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v-2l-4.257-2.257A6 6 0 0111 7h4zm-5 8v2a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 00-1-1h-2a1 1 0 00-1 1z" />
                    </svg>
                  </button>
                </div>
              ) : (
                <div onBlur={(e) => {
                  const value = (e.target as HTMLInputElement).value;
                  if (value.trim()) {
                    handleInputChange('businessIdea', value);
                    handleInputBlur('businessIdea', value);
                  }
                }}>
                  <PlaceholdersAndVanishInput 
                    placeholders={["AI-powered customer service platform", "Sustainable fashion marketplace", "Remote team collaboration tool", "Health tracking mobile app", "Local food delivery service"]} 
                    onChange={(e) => handleInputChange('businessIdea', e.target.value)} 
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleInputSubmit('businessIdea', formData.businessIdea);
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Target Audience */}
          <div className="relative">
            <label className="block text-sm font-medium text-[#111827] mb-1">
              Target Audience *
            </label>
            <div className="relative">
              {lockedFields.targetAudience ? (
                <div className="w-full p-3 border border-[#E5E7EB] rounded-lg bg-[#FFFFFF] text-[#6B7280] flex items-center justify-between shadow-sm">
                  <span className="truncate">{formData.targetAudience || 'No audience selected'}</span>
                  <button
                    type="button"
                    onClick={() => unlockField('targetAudience')}
                    className="ml-2 text-[#6366F1] hover:text-[#4F46E5] flex-shrink-0"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v-2l-4.257-2.257A6 6 0 0111 7h4zm-5 8v2a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 00-1-1h-2a1 1 0 00-1 1z" />
                    </svg>
                  </button>
                </div>
              ) : (
                <select
                  value={formData.targetAudience}
                  onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                  onBlur={(e) => handleInputBlur('targetAudience', e.target.value)}
                  className="w-full p-3 border border-[#E5E7EB] rounded-lg bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent shadow-sm"
                  required
                >
                  <option value="">Select your target audience</option>
                  {targetAudienceOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              )}
            </div>
            
            {formData.targetAudience === 'Other (specify below)' && (
              <div className="mt-2 relative">
                {lockedFields.customAudience ? (
                  <div className="w-full p-3 border border-[#E5E7EB] rounded-lg bg-[#FFFFFF] text-[#6B7280] flex items-center justify-between shadow-sm">
                    <span className="truncate">{formData.customAudience || 'No custom audience specified'}</span>
                    <button
                      type="button"
                      onClick={() => unlockField('customAudience')}
                      className="ml-2 text-[#6366F1] hover:text-[#4F46E5] flex-shrink-0"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v-2l-4.257-2.257A6 6 0 0111 7h4zm-5 8v2a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 00-1-1h-2a1 1 0 00-1 1z" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div onBlur={(e) => {
                    const value = (e.target as HTMLInputElement).value;
                    if (value.trim()) {
                      handleInputChange('customAudience', value);
                      handleInputBlur('customAudience', value);
                    }
                  }}>
                    <PlaceholdersAndVanishInput 
                      placeholders={["Freelancers and consultants", "Pet owners aged 25-45", "College students", "Rural small business owners", "Gaming enthusiasts"]} 
                      onChange={(e) => handleInputChange('customAudience', e.target.value)} 
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleInputSubmit('customAudience', formData.customAudience);
                      }}
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Unique Value Proposition */}
          <div className="relative">
            <label className="block text-sm font-medium text-[#111827] mb-1">
              Unique Value Proposition *
            </label>
            <div className="relative">
              {lockedFields.uniqueValueProposition ? (
                <div className="w-full p-3 border border-[#E5E7EB] rounded-lg bg-[#FFFFFF] text-[#6B7280] flex items-center justify-between shadow-sm">
                  <span className="truncate">{formData.uniqueValueProposition || 'No value proposition entered'}</span>
                  <button
                    type="button"
                    onClick={() => unlockField('uniqueValueProposition')}
                    className="ml-2 text-[#6366F1] hover:text-[#4F46E5] flex-shrink-0"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v-2l-4.257-2.257A6 6 0 0111 7h4zm-5 8v2a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 00-1-1h-2a1 1 0 00-1 1z" />
                    </svg>
                  </button>
                </div>
              ) : (
                <div onBlur={(e) => {
                  const value = (e.target as HTMLInputElement).value;
                  if (value.trim()) {
                    handleInputChange('uniqueValueProposition', value);
                    handleInputBlur('uniqueValueProposition', value);
                  }
                }}>
                  <PlaceholdersAndVanishInput 
                    placeholders={["Save customers 50% time with AI automation", "Zero waste packaging for eco-conscious consumers", "24/7 support with 99% uptime guarantee", "Personalized learning paths for every student", "Same-day delivery within 10 miles"]} 
                    onChange={(e) => handleInputChange('uniqueValueProposition', e.target.value)} 
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleInputSubmit('uniqueValueProposition', formData.uniqueValueProposition);
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-1">
              Optional Uploads
            </label>
            <p className="text-sm text-[#6B7280] mb-2">
              Upload screenshots, competitor sites, or any relevant files
            </p>
            
            <div className="w-full border border-dashed border-[#14B8A6] bg-[#F0FDFA] rounded-lg p-4 focus-within:ring-2 focus-within:ring-[#14B8A6] focus-within:ring-opacity-50">
              <FileUpload onChange={handleFileUpload} />
            </div>

            {formData.uploads.length > 0 && (
              <div className="mt-3">
                <h4 className="text-sm font-medium text-[#111827] mb-2">Uploaded Files:</h4>
                <div className="space-y-2">
                  {formData.uploads.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-[#FFFFFF] rounded border border-[#E5E7EB] shadow-sm">
                      <span className="text-sm text-[#6B7280] truncate">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-[#EF4444] hover:text-[#DC2626] ml-2"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="button"
              onClick={() => setShowReview(true)}
              disabled={!isFormValid()}
              className={`w-full py-3 px-6 rounded-lg font-medium transition-colors shadow-sm ${
                isFormValid()
                  ? 'bg-[#6366F1] text-white hover:bg-[#4F46E5]'
                  : 'bg-[#E5E7EB] text-[#6B7280] cursor-not-allowed'
              }`}
            >
              Confirm & Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}