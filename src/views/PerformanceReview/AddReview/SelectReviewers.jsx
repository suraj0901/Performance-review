import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function SelectReviewers({ name, list, form }) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {field.value.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-x-2 border py-1 px-2 rounded-lg my-0.5"
            >
              <Avatar>
                <AvatarImage src={item.profile} />
                <AvatarFallback>
                  {name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <p>{item.name}</p>
            </div>
          ))}
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button role="combobox" variant="outline">
                  Select Reviewers
                  <Badge className="ml-2">{field.value.length}</Badge>
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent>
              <Command>
                <CommandInput placeholder="Search employee" />
                <CommandList>
                  <CommandEmpty>No employee found.</CommandEmpty>
                  <CommandGroup>
                    {list?.map((item) => (
                      <CommandItem
                        key={item._id}
                        value={item.name}
                        onSelect={() => {
                          if (
                            field.value.find((_item) => _item._id === item._id)
                          ) {
                            field.onChange(
                              field.value.filter(
                                (_item) => _item._id !== item._id
                              )
                            );
                          } else {
                            field.onChange([...field.value, item]);
                          }
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            field.value.find((_item) => _item._id === item._id)
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {item.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
