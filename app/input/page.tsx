'use client';
import { useState, useCallback, useMemo } from 'react';
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';
import { FileUpload } from '@/components/ui/file-upload';

interface FormData {
  businessIdea: string;
  targetAudience: string;
  customAudience: string;
  uniqueValueProposition: string;
  uploads: File[];
}

const TARGET_AUDIENCE_OPTIONS = [
  'Small Businesses (1-50 employees)',
  'Medium Enterprises (51-500 employees)',
  'Large Corporations (500+ employees)',
  'Individual Consumers (B2C)',
  'Tech Startups',
  'E-commerce Businesses',
  'Healthcare Organizations',
  'Educational Institutions',
  'Non-profit Organizations',
  'Other (specify below)',
] as const;

const FORM_FIELDS = [
  { field: 'businessIdea', label: 'Business Idea' },
  { field: 'targetAudience', label: 'Target Audience' },
  { field: 'uniqueValueProposition', label: 'Value Proposition' },
  { field: 'uploads', label: 'Files (Optional)' },
] as const;

const CheckIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

const EditIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
    />
  </svg>
);

const FileIcon = () => (
  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

const DeleteIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);

function LockableInput({
  field,
  value,
  locked,
  placeholders,
  onChange,
  onSubmit,
  onUnlock,
  label,
  description,
}: {
  field: keyof FormData;
  value: string;
  locked: boolean;
  placeholders: string[];
  onChange: (field: keyof FormData, value: string) => void;
  onSubmit: (field: keyof FormData, value: string) => void;
  onUnlock: (field: keyof FormData) => void;
  label: string;
  description: string;
}) {
  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const inputValue = e.target.value.trim();
      onChange(field, inputValue);
      if (inputValue) {
        onSubmit(field, inputValue);
      }
    },
    [field, onChange, onSubmit],
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <label className="text-lg font-semibold text-gray-900">{label}</label>
        <span className="text-red-500">*</span>
      </div>
      <p className="text-gray-600">{description}</p>
      {locked ? (
        <div className="relative group">
          <div className="w-full p-4 border-2 border-green-200 rounded-xl bg-orange-100 text-gray-800 flex items-center justify-between relative">
            <span className="flex-1 pr-4 z-10">{value || `No ${field} entered`}</span>
            <button
              type="button"
              onClick={() => onUnlock(field)}
              className="flex-shrink-0 p-2 text-indigo-600 hover:text-indigo-800 hover:bg-white rounded-lg transition-all duration-200 z-10"
              title={`Edit ${field}`}
            >
              <EditIcon />
            </button>
          </div>
        </div>
      ) : (
        <div onBlur={handleBlur}>
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(field, e.target.value)}
            onSubmit={(e: React.FormEvent) => {
              e.preventDefault();
              if (value.trim()) onSubmit(field, value);
            }}
            value={value}
          />
        </div>
      )}
    </div>
  );
}

export default function InputPage() {
  const [formData, setFormData] = useState<FormData>({
    businessIdea: '',
    targetAudience: '',
    customAudience: '',
    uniqueValueProposition: '',
    uploads: [],
  });
  
  const [lockedFields, setLockedFields] = useState({
    businessIdea: false,
    targetAudience: false,
    customAudience: false,
    uniqueValueProposition: false,
  });

  const handleInputChange = useCallback((field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleInputSubmit = useCallback((field: keyof FormData, value: string) => {
    if (value.trim()) {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setLockedFields((prev) => ({ ...prev, [field]: true }));
    }
  }, []);

  const unlockField = useCallback((field: keyof FormData) => {
    setLockedFields((prev) => ({ ...prev, [field]: false }));
    if (!formData[field as keyof FormData]) {
      setFormData((prev) => ({ ...prev, [field]: '' }));
    }
  }, [formData]);

  const handleFileUpload = useCallback((newFiles: File[]) => {
    setFormData((prev) => ({ ...prev, uploads: newFiles }));
  }, []);

  const removeFile = useCallback((index: number) => {
    setFormData((prev) => ({
      ...prev,
      uploads: prev.uploads.filter((_, i) => i !== index),
    }));
  }, []);

  const isFormValid = useMemo(() => {
    return (
      formData.businessIdea.trim() &&
      formData.targetAudience &&
      formData.uniqueValueProposition.trim()
    );
  }, [formData]);

  const handleSubmit = useCallback(() => {
    if (isFormValid) {
      console.log('Form submitted:', formData);
    }
  }, [formData, isFormValid]);

  const isFieldCompleted = useCallback((field: string) => {
    if (field === 'uploads') return formData.uploads.length > 0;
    return Boolean(formData[field as keyof FormData]) && lockedFields[field as keyof typeof lockedFields];
  }, [formData, lockedFields]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-orange-500 shadow-lg rounded-2xl my-5">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-2">
              Business Strategy Generator
            </h1>
            <p className="text-indigo-100 text-lg opacity-90">
              Transform your idea into a comprehensive strategy
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Complete Your Profile</h3>
              <div className="space-y-6">
                {FORM_FIELDS.map(({ field, label }, index) => (
                  <div key={field} className="flex items-center space-x-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isFieldCompleted(field)
                          ? 'bg-green-100 text-green-600'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {isFieldCompleted(field) ? <CheckIcon /> : index + 1}
                    </div>
                    <span className="text-gray-700">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100">
              <h4 className="font-semibold text-gray-900 mb-3">💡 Pro Tips</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Be specific about your target market</li>
                <li>• Focus on unique benefits, not features</li>
                <li>• Include measurable outcomes when possible</li>
                <li>• Upload competitor analysis for better insights</li>
              </ul>
            </div>
          </div>

          {/* Right Main Inputs */}
          <div className="lg:col-span-8">
            <div className="bg-orange-50 rounded-2xl shadow-lg border border-orange-200 overflow-hidden">
              <div className="p-8 space-y-8">
                <LockableInput
                  field="businessIdea"
                  value={formData.businessIdea}
                  locked={lockedFields.businessIdea}
                  placeholders={[
                    'AI-powered customer service platform',
                    'Sustainable fashion marketplace',
                    'Remote team collaboration tool',
                    'Health tracking mobile app',
                    'Local food delivery service',
                  ]}
                  onChange={handleInputChange}
                  onSubmit={handleInputSubmit}
                  onUnlock={unlockField}
                  label="Business Idea"
                  description="Describe your business concept in one clear sentence"
                />

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <label className="text-lg font-semibold text-gray-900">Target Audience</label>
                    <span className="text-red-500">*</span>
                  </div>
                  <p className="text-gray-700">Who are you building this for?</p>
                  {lockedFields.targetAudience ? (
                    <div className="relative group">
                      <div className="w-full p-4 border-2 border-green-200 rounded-xl bg-orange-100 text-gray-800 flex items-center justify-between relative">
                        <span className="flex-1 pr-4 z-10">
                          {formData.targetAudience || 'No audience selected'}
                        </span>
                        <button
                          type="button"
                          onClick={() => unlockField('targetAudience')}
                          className="flex-shrink-0 p-2 text-indigo-600 hover:text-indigo-800 hover:bg-white rounded-lg transition-all duration-200 z-10"
                          title="Edit target audience"
                        >
                          <EditIcon />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <select
                      value={formData.targetAudience}
                      onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                      onBlur={(e) => handleInputSubmit('targetAudience', e.target.value)}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-gray-800"
                      required
                    >
                      <option value="">Select your target audience</option>
                      {TARGET_AUDIENCE_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  )}

                  {formData.targetAudience === 'Other (specify below)' && (
                    <div className="mt-4 space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Specify your custom audience
                      </label>
                      <LockableInput
                        field="customAudience"
                        value={formData.customAudience}
                        locked={lockedFields.customAudience}
                        placeholders={[
                          'Freelancers and consultants',
                          'Pet owners aged 25-45',
                          'College students',
                          'Rural small business owners',
                          'Gaming enthusiasts',
                        ]}
                        onChange={handleInputChange}
                        onSubmit={handleInputSubmit}
                        onUnlock={unlockField}
                        label="Custom Audience"
                        description=""
                      />
                    </div>
                  )}
                </div>

                <LockableInput
                  field="uniqueValueProposition"
                  value={formData.uniqueValueProposition}
                  locked={lockedFields.uniqueValueProposition}
                  placeholders={[
                    'Save customers 50% time with AI automation',
                    'Zero waste packaging for eco-conscious consumers',
                    '24/7 support with 99% uptime guarantee',
                    'Personalized learning paths for every student',
                    'Same-day delivery within 10 miles',
                  ]}
                  onChange={handleInputChange}
                  onSubmit={handleInputSubmit}
                  onUnlock={unlockField}
                  label="Unique Value Proposition"
                  description="What makes your solution uniquely valuable?"
                />

                <div className="space-y-3">
                  <label className="text-lg font-semibold text-gray-900">Supporting Documents</label>
                  <p className="text-gray-700">
                    Upload screenshots, competitor analysis, market research, or any relevant files
                  </p>
                  <div className="border-2 border-dashed border-orange-300 bg-orange-50 rounded-xl p-6 hover:border-orange-400 hover:bg-orange-100 transition-all duration-200">
                    <FileUpload onChange={handleFileUpload} />
                  </div>
                  {formData.uploads.length > 0 && (
                    <div className="mt-4 space-y-3">
                      <h4 className="font-medium text-gray-900">Uploaded Files ({formData.uploads.length})</h4>
                      <div className="grid gap-3">
                        {formData.uploads.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-4 bg-orange-50 rounded-xl border border-orange-200 hover:bg-orange-100 transition-colors duration-200"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                                <FileIcon />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900 truncate">{file.name}</p>
                                <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                              title="Remove file"
                            >
                              <DeleteIcon />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-orange-100 px-8 py-6 border-t border-orange-200">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    {isFormValid ? (
                      <span className="text-green-600 font-medium">✓ Ready to generate your strategy</span>
                    ) : (
                      <span></span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!isFormValid}
                    className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform ${
                      isFormValid
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 hover:scale-105 shadow-lg hover:shadow-xl'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Generate Strategy →
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
