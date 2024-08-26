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
import { useState } from "react";
import Image from "next/image";

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

const descriptions: { [key: string]: { description: string, image: string } } = {
  "Web Development": {
    description: "Focuses on building and maintaining websites and web applications. Involves front-end and back-end development, as well as knowledge of various programming languages and frameworks.",
    image: "/skills/web-dev.png"
  },
  "Game Development": {
    description: "Involves creating and designing interactive video games. This field covers aspects like game mechanics, graphics, programming, and storytelling to create engaging experiences.",
    image: "/skills/game-dev.png"
  },
  "Cyber Security": {
    description: "Specializes in protecting systems, networks, and data from cyber threats. This includes identifying vulnerabilities, implementing security measures, and responding to security incidents.",
    image: "/skills/cyber-security.png"
  },
  "Data Science": {
    description: "Uses statistical analysis, machine learning, and data visualization to extract insights from data. Data scientists analyze and interpret complex data to help businesses make informed decisions.",
    image: "/skills/data-science.png"
  },
  "Mobile Development": {
    description: "Focuses on creating applications for mobile devices like smartphones and tablets. This includes designing, coding, and testing apps for platforms such as iOS and Android.",
    image: "/skills/mobile-dev.png"
  },
  "Product Manager": {
    description: "Involves overseeing the development and delivery of products. Product managers work on defining product vision, gathering requirements, and coordinating with teams to bring a product to market.",
    image: "/skills/product-management.png"
  },
  "UI/UX": {
    description: "Concentrates on designing user interfaces and improving user experiences. This includes creating intuitive designs, conducting user research, and ensuring a seamless interaction between users and products.",
    image: "/skills/ui-ux.png"
  },
  "Software Engineering": {
    description: "Involves designing, developing, and maintaining software systems. Software engineers apply engineering principles to create scalable, reliable, and efficient software solutions.",
    image: "/skills/software-engineering.png"
  },
};


export default function PredictForm() {
  const [result, setResult] = useState<{
    image: string;
    title: string;
    description: string;
  } | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      Confidence_Level: 5,
      Self_Assessed_Skill_Level_in_WebDev: 5,
      Interest_Level_in_WebDev: 5,
      Self_Assessed_Skill_Level_in_GameDev: 5,
      Interest_Level_in_GameDev: 5,
      Self_Assessed_Skill_Level_in_CyberSecurity: 5,
      Interest_Level_in_CyberSecuirty: 5,
      Self_Assessed_Skill_Level_in_DataScience: 5,
      Interest_Level_in_DataScience: 5,
      Self_Assessed_Skill_Level_in_MobileDev: 5,
      Interest_Level_in_MobileDev: 5,
      Self_Assessed_Skill_Level_in_ProductManager: 5,
      Interest_Level_in_ProductManager: 5,
      Self_Assessed_Skill_Level_in_UIUX: 5,
      Interest_Level_in_UIUX: 5,
      Self_Assessed_Skill_Level_in_SoftEng: 5,
      Interest_Level_in_SoftEng: 5,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      console.log(data);
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
  
      const resultDetails = descriptions[Prediction] || { description: "", image: "" };
  
      setResult({
        image: resultDetails.image,
        title: Prediction,
        description: resultDetails.description,
      });
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
        {result ? (
          <div className="flex flex-col my-8 items-center justify-center gap-y-12 text-center">
            <Image
                src={result.image}
                alt={result.title}
                width={150}
                height={150}
                className="w-8/12 md:w-6/12 lg:w-4/12 xl:w-2/12"
              />
            <div className="flex flex-col gap-y-6 text-lg lg:text-xl">
              <p className="text-2xl lg:text-3xl font-semibold">
                Your result is{" "}
                <span className="text-[#535cf9] font-bold">
                  {result && result.title}
                </span>
              </p>
              <p>{result.description}</p>
            </div>
          </div>
        ) : (
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
                    label:
                      "How would you rate your skills in Game Development?",
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
                              <FormItem
                                key={i + 1}
                                className="flex items-center"
                              >
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
        )}
      </div>
    </main>
  );
}
