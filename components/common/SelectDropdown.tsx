"use client"; // Ensure this at the top for Next.js client-side hooks

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Control, useController, FieldValues, Path } from "react-hook-form";

// Define the props that the SelectDropdown component expects
interface Option {
  label: string;
  value: string;
}

interface SelectDropdownProps<T extends FieldValues> { // Constrain T to FieldValues
  label?: string; // Label for the select dropdown
  name: Path<T>; // Use Path<T> for the name of the form field
  options: Option[]; // Array of options to display in the dropdown
  control: Control<T>; // React Hook Form control object
}

export function SelectDropdown<T extends FieldValues>({ label, name, options, control }: SelectDropdownProps<T>) {
  const {
    field: { onChange, value },
  } = useController({
    name,
    control,
  });

  return (
    <div>
      {
        label && (
          <label className="block mb-2 text-heading font-poppin font-[400] text-[0.9rem]">{label}</label>
        )
      }
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger className="border border-gray-300">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}