"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  Confidence_Level: z.number().int().min(1).max(10),
  Self_Assessed_Skill_Level_in_WebDev: z.number().int().min(1).max(10),
  Interest_Level_in_WebDev: z.number().int().min(1).max(10),
  Self_Assessed_Skill_Level_in_GameDev: z.number().int().min(1).max(10),
  Interest_Level_in_GameDev: z.number().int().min(1).max(10),
  Self_Assessed_Skill_Level_in_CyberSecurity: z.number().int().min(1).max(10),
  Interest_Level_in_CyberSecuirty: z.number().int().min(1).max(10),
  Self_Assessed_Skill_Level_in_DataScience: z.number().int().min(1).max(10),
  Interest_Level_in_DataScience: z.number().int().min(1).max(10),
  Self_Assessed_Skill_Level_in_MobileDev: z.number().int().min(1).max(10),
  Interest_Level_in_MobileDev: z.number().int().min(1).max(10),
  Self_Assessed_Skill_Level_in_ProductManager: z.number().int().min(1).max(10),
  Interest_Level_in_ProductManager: z.number().int().min(1).max(10),
  Self_Assessed_Skill_Level_in_UIUX: z.number().int().min(1).max(10),
  Interest_Level_in_UIUX: z.number().int().min(1).max(10),
  Self_Assessed_Skill_Level_in_SoftEng: z.number().int().min(1).max(10),
  Interest_Level_in_SoftEng: z.number().int().min(1).max(10),
});

interface PredictFormProps {
  user_id: number;
}

export default function PredictForm({ user_id }: PredictFormProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      Confidence_Level: 1,
      Self_Assessed_Skill_Level_in_WebDev: 1,
      Interest_Level_in_WebDev: 1,
      Self_Assessed_Skill_Level_in_GameDev: 1,
      Interest_Level_in_GameDev: 1,
      Self_Assessed_Skill_Level_in_CyberSecurity: 1,
      Interest_Level_in_CyberSecuirty: 1,
      Self_Assessed_Skill_Level_in_DataScience: 1,
      Interest_Level_in_DataScience: 1,
      Self_Assessed_Skill_Level_in_MobileDev: 1,
      Interest_Level_in_MobileDev: 1,
      Self_Assessed_Skill_Level_in_ProductManager: 1,
      Interest_Level_in_ProductManager: 1,
      Self_Assessed_Skill_Level_in_UIUX: 1,
      Interest_Level_in_UIUX: 1,
      Self_Assessed_Skill_Level_in_SoftEng: 1,
      Interest_Level_in_SoftEng: 1,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      console.log(data);

      // Generate a unique result_id
      const result_id = uuidv4();

      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit data");
      }

      const resultData = await response.json();
      console.log(resultData);
      const { Prediction } = resultData;

      // Save the result to the database, including user_id and result_id
      const saveResponse = await fetch(`/api/result/${user_id}/${result_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          field: Prediction,
        }),
      });

      if (!saveResponse.ok) {
        throw new Error("Failed to save result to database");
      }
      router.push(`/result/${user_id}/${result_id}`);
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred. Please try again.");
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden pb-20">
      {/* Ellipses background */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#b3b5fd] opacity-50 rounded-full filter blur-3xl z-0"></div>
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#b3b5fd] opacity-50 rounded-full filter blur-3xl z-0"></div>
      <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-[#b3b5fd] opacity-50 rounded-full filter blur-3xl z-0"></div>

      <div className="relative z-10 mt-20 flex flex-col items-center justify-center mx-6 md:mx-20 lg:mx-32">
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col text-center gap-y-6 mb-12">
            <h1 className="text-3xl text-[#535cf9] lg:text-4xl xl:text-5xl font-hammer">
              Filling out this form!
            </h1>
            <p className="text-lg xl:text-xl text-slate-600">
              Choose one value from the ten values that best represents you,
              where 1 = very bad and 10 = very good, with higher values
              indicating better performance.
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full max-w-xl space-y-6"
            >
              {[
                {
                  name: "Confidence_Level",
                  label:
                    "How confident are you about your current programming skills?",
                },
                {
                  name: "Self_Assessed_Skill_Level_in_WebDev",
                  label: "How would you rate your skills in Web Development?",
                },
                {
                  name: "Interest_Level_in_WebDev",
                  label: "How interested are you in Web Development?",
                },
                {
                  name: "Self_Assessed_Skill_Level_in_GameDev",
                  label: "How would you rate your skills in Game Development?",
                },
                {
                  name: "Interest_Level_in_GameDev",
                  label: "How interested are you in Game Development?",
                },
                {
                  name: "Self_Assessed_Skill_Level_in_CyberSecurity",
                  label: "How would you rate your skills in Cyber Security?",
                },
                {
                  name: "Interest_Level_in_CyberSecuirty",
                  label: "How interested are you in Cyber Security?",
                },
                {
                  name: "Self_Assessed_Skill_Level_in_DataScience",
                  label: "How would you rate your skills in Data Science?",
                },
                {
                  name: "Interest_Level_in_DataScience",
                  label: "How interested are you in Data Science?",
                },
                {
                  name: "Self_Assessed_Skill_Level_in_MobileDev",
                  label:
                    "How would you rate your skills in Mobile Development?",
                },
                {
                  name: "Interest_Level_in_MobileDev",
                  label: "How interested are you in Mobile Development?",
                },
                {
                  name: "Self_Assessed_Skill_Level_in_ProductManager",
                  label:
                    "How would you rate your skills in Product Management?",
                },
                {
                  name: "Interest_Level_in_ProductManager",
                  label: "How interested are you in Product Management?",
                },
                {
                  name: "Self_Assessed_Skill_Level_in_UIUX",
                  label: "How would you rate your skills in UI/UX Design?",
                },
                {
                  name: "Interest_Level_in_UIUX",
                  label: "How interested are you in UI/UX Design?",
                },
                {
                  name: "Self_Assessed_Skill_Level_in_SoftEng",
                  label:
                    "How would you rate your skills in Software Engineering?",
                },
                {
                  name: "Interest_Level_in_SoftEng",
                  label: "How interested are you in Software Engineering?",
                },
              ].map(({ name, label }) => (
                <FormField
                  key={name}
                  control={form.control}
                  name={name as keyof z.infer<typeof FormSchema>}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg xl:text-xl font-semibold">
                        {label}
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          value={field.value?.toString()}
                          onValueChange={(value) =>
                            field.onChange(Number(value))
                          }
                          className="flex flex-wrap space-x-2 space-y-2"
                        >
                          {Array.from({ length: 10 }, (_, i) => (
                            <FormItem key={i + 1} className="flex items-center">
                              <FormControl>
                                <RadioGroupItem
                                  value={(i + 1).toString()}
                                  className="mx-1"
                                />
                              </FormControl>
                              <FormLabel className="font-normal text-lg xl:text-xl">
                                {i + 1}
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}

              <div className="flex w-full flex-col items-center">
                <Button type="submit" className="text-lg xl:text-xl px-12">
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
}
