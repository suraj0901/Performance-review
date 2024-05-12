import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { MinusCircle, PlusCircle } from "lucide-react";
import { useFieldArray } from "react-hook-form";

export function Question({ name, form }) {
  const { append, fields, remove } = useFieldArray({
    name,
    control: form.control,
  });
  const Fields = fields.map((field, index) => (
    <FormField
      key={field.id}
      control={form.control}
      name={`questions.${index}.title`}
      render={({ field }) => (
        <Card>
          <div className="flex justify-between m-2">
            <p className="p-2">{index + 1}</p>
            <Button onClick={() => remove(index)} variant="ghost" size="icon">
              <MinusCircle size={18} />
            </Button>
          </div>
          <CardContent>
            <FormItem>
              <FormControl>
                <Textarea placeholder="Enter question" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          </CardContent>
        </Card>
      )}
    />
  ));

  return (
    <div className="grid gap-y-2">
      {Fields}
      <Button
        type="button"
        variant="secondary"
        onClick={() => append({ title: "" })}
        className="w-full"
      >
        <PlusCircle size={20} className="mr-2" /> Add Question
      </Button>
    </div>
  );
}
