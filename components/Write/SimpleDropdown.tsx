"use client"

import * as React from "react"
import { Controller } from "react-hook-form"
import { Check, ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Control, FieldValues, Path } from "react-hook-form"

// Define the default tone of voice options
const defaultTonesOfVoice = [
  { title: "Professional", value: "professional" },
  { title: "Casual", value: "casual" },
  { title: "Excited", value: "excited" },
  { title: "Witty", value: "witty" },
  { title: "Bold", value: "bold" },
  { title: "Sarcastic", value: "sarcastic" },
  { title: "Secretive", value: "secretive" },
  { title: "Dramatic", value: "dramatic" },
  { title: "Grumpy", value: "grumpy" },
]

// Define the props for the SimpleDropdown component
interface SimpleDropdownProps<T extends FieldValues> {
  name: Path<T>; // Form field name
  control: Control<T>; // React Hook Form control object
  label: string; // Label text
  data?: { title: string; value: string }[] | null; // Optional data array, can be null
}

export function SimpleDropdown<T extends FieldValues>({
  control,
  name,
  label,
  data, // Optional dynamic data array
}: SimpleDropdownProps<T>) {
  const [open, setOpen] = React.useState(false)

  // Use data if it's not null/undefined, otherwise fall back to defaultTonesOfVoice
  const options = data && data.length > 0 ? data : defaultTonesOfVoice

  return (
    <div>
      <label className="block text-heading font-poppin font-[400] text-[0.9rem] mb-1">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild className="w-full">
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="justify-between relative py-2 font-poppin font-[400] text-heading text-[0.9rem] m-0 hover:text-heading px-2"
              >
                {field.value
                  ? options.find((item) => item.value === field.value)?.title
                  : ""} {/* Placeholder text */}
                <ChevronDown color="#707375" className="h-4 w-4 opacity-50 absolute right-3" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="max-h-[248px] PopoverContent">
              <Command>
                <CommandInput placeholder="Search..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    {options.map((item) => (
                      <CommandItem
                        key={item.value}
                        value={item.value}
                        onSelect={(currentValue) => {
                          field.onChange(currentValue === field.value ? "" : currentValue)
                          setOpen(false)
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            field.value === item.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {item.title}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        )}
      />
    </div>
  )
}
