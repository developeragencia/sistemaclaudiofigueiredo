
import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  className?: string;
}

// Default color palette
const presetColors = [
  '#000000', '#ffffff', '#f44336', '#e91e63', '#9c27b0', '#673ab7',
  '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50',
  '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722',
  '#795548', '#607d8b'
];

export const ColorPicker: React.FC<ColorPickerProps> = ({ value, onChange, className }) => {
  const [open, setOpen] = useState(false);
  const [currentColor, setCurrentColor] = useState(value);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setCurrentColor(color);
  };

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hex = e.target.value;
    if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex) || hex === '#' || hex === '') {
      setCurrentColor(hex);
    }
  };

  const handlePresetClick = (color: string) => {
    setCurrentColor(color);
    onChange(color);
  };

  const handleApply = () => {
    onChange(currentColor);
    setOpen(false);
  };

  return (
    <div className={className}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            className={cn("w-full justify-start flex", className)}
            role="combobox"
            aria-expanded={open}
          >
            <div 
              className="h-4 w-4 rounded-full border mr-2 shrink-0" 
              style={{ backgroundColor: value }}
            />
            <span>{value}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-4 w-64">
          <div className="space-y-4">
            <div>
              <div 
                className="h-24 rounded-md border mb-2"
                style={{ backgroundColor: currentColor }}
              />
              <div className="flex">
                <Input
                  type="color"
                  value={currentColor}
                  onChange={handleColorChange}
                  className="h-10 p-1 w-12"
                />
                <Input
                  type="text"
                  value={currentColor}
                  onChange={handleHexChange}
                  className="flex-1 ml-2"
                  placeholder="#000000"
                />
              </div>
            </div>
            
            <div>
              <Label className="mb-2 block">Cores predefinidas</Label>
              <div className="grid grid-cols-5 gap-2">
                {presetColors.map(color => (
                  <Button
                    key={color}
                    type="button"
                    variant="ghost"
                    className="h-8 w-8 p-0 rounded-full"
                    style={{ backgroundColor: color }}
                    onClick={() => handlePresetClick(color)}
                  />
                ))}
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button size="sm" onClick={handleApply}>
                Aplicar
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
