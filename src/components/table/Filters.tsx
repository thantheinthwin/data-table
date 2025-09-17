/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FilterConfig } from '@/types/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Input } from '../ui/input';

interface FiltersProps<T = Record<string, any>> {
  filters: T;
  filterConfigs: FilterConfig<T>[];
  onFiltersChange: (filters: T) => void;
  className?: string;
}

export default function Filters<T extends Record<string, any>>({
  filters,
  filterConfigs,
  onFiltersChange,
  className = '',
}: FiltersProps<T>) {
  const [localValues, setLocalValues] = useState<Record<string, string>>({});
  const debounceTimeouts = useRef<Record<string, NodeJS.Timeout>>({});

  // Initialize local values from filters
  useEffect(() => {
    const initialValues: Record<string, string> = {};
    filterConfigs.forEach((config) => {
      const value = filters[config.key];
      if (typeof value === 'string') {
        initialValues[String(config.key)] = value;
      }
    });
    setLocalValues(initialValues);
  }, [filters, filterConfigs]);

  const debouncedUpdateFilters = (field: keyof T, value: string) => {
    const fieldKey = String(field);
    const timeoutKey = fieldKey;

    if (debounceTimeouts.current[timeoutKey]) {
      clearTimeout(debounceTimeouts.current[timeoutKey]);
    }

    const config = filterConfigs.find((c) => c.key === field);
    const debounceMs = config?.debounceMs || 300;

    debounceTimeouts.current[timeoutKey] = setTimeout(() => {
      onFiltersChange({ ...filters, [field]: value });
    }, debounceMs);
  };

  const handleInputChange = (field: keyof T, value: string) => {
    const fieldKey = String(field);
    setLocalValues((prev) => ({ ...prev, [fieldKey]: value }));
    debouncedUpdateFilters(field, value);
  };

  const handleSelectChange = (field: keyof T, value: string) => {
    onFiltersChange({ ...filters, [field]: value });
  };

  const renderFilter = (config: FilterConfig<T>) => {
    const fieldKey = String(config.key);
    const currentValue =
      localValues[fieldKey] || String(filters[config.key] || '');

    switch (config.type) {
      case 'text':
        return (
          <div key={fieldKey} className="flex-1">
            <label
              htmlFor={fieldKey}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {config.label}
            </label>
            <Input
              id={fieldKey}
              type="text"
              value={currentValue}
              onChange={(e) => handleInputChange(config.key, e.target.value)}
              placeholder={
                config.placeholder || `Enter ${config.label.toLowerCase()}...`
              }
              className="text-gray-700 border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:border-green-500"
            />
          </div>
        );

      case 'select':
        return (
          <div key={fieldKey} className="sm:w-48">
            <label
              htmlFor={fieldKey}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {config.label}
            </label>
            <Select
              value={String(filters[config.key] || '')}
              onValueChange={(value) => handleSelectChange(config.key, value)}
            >
              <SelectTrigger className="h-10 border border-gray-300 rounded-lg font-medium focus:ring-2 focus:ring-green-500 focus:border-green-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {config.options?.map((option) => (
                  <SelectItem
                    key={String(option.value)}
                    value={String(option.value)}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case 'number':
        return (
          <div key={fieldKey} className="flex-1">
            <label
              htmlFor={fieldKey}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {config.label}
            </label>
            <Input
              id={fieldKey}
              type="number"
              value={currentValue}
              onChange={(e) => handleInputChange(config.key, e.target.value)}
              placeholder={
                config.placeholder || `Enter ${config.label.toLowerCase()}...`
              }
              className="text-gray-700 border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:border-green-500"
            />
          </div>
        );

      case 'date':
        return (
          <div key={fieldKey} className="flex-1">
            <label
              htmlFor={fieldKey}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {config.label}
            </label>
            <Input
              id={fieldKey}
              type="date"
              value={currentValue}
              onChange={(e) => handleInputChange(config.key, e.target.value)}
              className="text-gray-700 border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:border-green-500"
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`space-y-4 mb-6 ${className}`}>
      <div className="flex flex-col sm:flex-row gap-4">
        {filterConfigs.map(renderFilter)}
      </div>
    </div>
  );
}
