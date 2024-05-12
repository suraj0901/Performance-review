import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectAssignee({ name, list, form }) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <Select defaultValue={field.value} onValueChange={field.onChange}>
          <FormItem>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select Assignee" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                {list.map((item) => (
                  <SelectItem value={item._id} key={item._id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
            <FormMessage />
          </FormItem>
        </Select>
      )}
    />
  );
}
