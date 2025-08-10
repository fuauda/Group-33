'use client';;
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '../../lib/utils';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';
import { Progress } from './progress';
import { CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';

// Define the form schema for each step
const personalInfoSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  role: z.enum(['individual', 'ngo'], {
    required_error: 'Please select an account type',
  }),
});

const addressSchema = z.object({
  address: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  state: z.string().min(2, 'State is required'),
  country: z.string().min(2, 'Country is required'),
  zipCode: z.string().min(5, 'Zip code must be at least 5 characters'),
});

const ngoInfoSchema = z.object({
  ngoName: z.string().min(2, 'Organization name is required'),
  ngoMission: z.string().min(10, 'Please provide a mission statement'),
  ngoDescription: z.string().optional(),
  ngoWebsite: z.string().url('Please enter a valid URL').or(z.literal('')),
  ngoLogo: z.string().url('Please enter a valid URL').or(z.literal('')),
  ngoPhone: z.string().min(8, 'Please enter a valid phone number'),
});

const accountSchema = z
  .object({
    username: z.string().min(3, 'Username must be at least 3 characters'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

// Combine all schemas for the final form data
const formSchema = z.object({
  ...personalInfoSchema.shape,
  ...addressSchema.shape,
  ...accountSchema.shape,
  ...ngoInfoSchema.shape,
});

export default function MultiStepForm({
  className,
  onSubmit
}) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Define the steps
  const steps = [
    {
      id: 'personal',
      title: 'Account Type',
      description: 'Are you an individual or representing an organization?',
      schema: personalInfoSchema,
      fields: [
        {
          name: 'firstName',
          label: 'First Name',
          type: 'text',
          placeholder: 'John',
        },
        {
          name: 'lastName',
          label: 'Last Name',
          type: 'text',
          placeholder: 'Doe',
        },
        {
          name: 'email',
          label: 'Email',
          type: 'email',
          placeholder: 'john.doe@example.com',
        },
        {
          name: 'role',
          label: 'Account Type',
          type: 'radio',
          options: [
            { value: 'individual', label: 'Individual' },
            { value: 'ngo', label: 'Organization/NGO' },
          ],
        },
      ],
    },
    {
      id: 'address',
      title: 'Address Information',
      description: 'Where are you located?',
      schema: addressSchema,
      fields: [
        {
          name: 'address',
          label: 'Street Address',
          type: 'text',
          placeholder: '123 Main St',
        },
        { name: 'city', label: 'City', type: 'text', placeholder: 'New York' },
        { name: 'state', label: 'State/Province', type: 'text', placeholder: 'NY' },
        { name: 'country', label: 'Country', type: 'text', placeholder: 'United States' },
        {
          name: 'zipCode',
          label: 'ZIP/Postal Code',
          type: 'text',
          placeholder: '10001',
        },
      ],
    },
    {
      id: 'ngo',
      title: 'Organization Information',
      description: 'Tell us about your organization',
      schema: ngoInfoSchema,
      condition: (data) => data.role === 'ngo',
      fields: [
        {
          name: 'ngoName',
          label: 'Organization Name',
          type: 'text',
          placeholder: 'Global Help Foundation',
        },
        {
          name: 'ngoMission',
          label: 'Mission Statement',
          type: 'textarea',
          placeholder: 'Our mission is to...',
        },
        {
          name: 'ngoDescription',
          label: 'Description (Optional)',
          type: 'textarea',
          placeholder: 'Tell us more about your organization...',
          optional: true,
        },
        {
          name: 'ngoPhone',
          label: 'Contact Phone',
          type: 'tel',
          placeholder: '+1 (123) 456-7890',
        },
        {
          name: 'ngoWebsite',
          label: 'Website (Optional)',
          type: 'url',
          placeholder: 'https://example.org',
          optional: true,
        },
        {
          name: 'ngoLogo',
          label: 'Logo URL (Optional)',
          type: 'url',
          placeholder: 'https://example.org/logo.png',
          optional: true,
        },
      ],
    },
    {
      id: 'account',
      title: 'Account Setup',
      description: 'Create your account',
      schema: accountSchema,
      fields: [
        {
          name: 'username',
          label: 'Username',
          type: 'text',
          placeholder: 'johndoe',
        },
        {
          name: 'password',
          label: 'Password',
          type: 'password',
          placeholder: '••••••••',
        },
        {
          name: 'confirmPassword',
          label: 'Confirm Password',
          type: 'password',
          placeholder: '••••••••',
        },
      ],
    },
  ];

  // Filter steps based on conditions (like role selection)
  const visibleSteps = steps.filter(step => {
    if (!step.condition) return true;
    return step.condition(formData);
  });

  // Get the current step schema
  const currentStep = visibleSteps[step];
  const currentStepSchema = currentStep.schema;

  // Setup form with the current step schema
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(currentStepSchema),
    defaultValues: formData,
  });

  // Calculate progress percentage
  const progress = ((step + 1) / visibleSteps.length) * 100;

  // Handle next step
  const handleNextStep = (data) => {
    const updatedData = { ...formData, ...data };
    setFormData(updatedData);

    // Check if there are more visible steps
    const currentStepIndex = visibleSteps.findIndex(s => s.id === currentStep.id);
    const hasMoreSteps = currentStepIndex < visibleSteps.length - 1;

    if (hasMoreSteps) {
      // Move to the next visible step
      setStep(step + 1);
      // Reset form with the updated data for the next step
      reset(updatedData);
    } else {
      // Final step submission
      const submit = async () => {
        try {
          setSubmitError("");
          setIsSubmitting(true);
          if (onSubmit) {
            const ok = await onSubmit(updatedData);
            if (ok) {
              setIsComplete(true);
            } else {
              setSubmitError("Submission failed. Please review your input and try again.");
            }
          } else {
            setIsComplete(true);
          }
        } catch (e) {
          setSubmitError("Unexpected error. Please try again.");
        } finally {
          setIsSubmitting(false);
        }
      };
      submit();
    }
  };

  // Handle previous step
  const handlePrevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  // Animation variants
  const variants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    (<div
      className={cn('bg-card/40 mx-auto w-full max-w-2xl rounded-lg p-10 shadow-lg', className)}>
      {!isComplete ? (
        <>
          {/* Progress bar */}
          <div className="mb-8">
            <div className="mb-2 flex justify-between">
              <span className="text-sm font-medium">
                Step {step + 1} of {steps.length}
              </span>
              <span className="text-sm font-medium">
                {Math.round(progress)}%
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step indicators */}
          <div className="mb-8 flex justify-between">
            {visibleSteps.map((s, i) => (
              <div
                key={s.id}
                className={`flex items-center ${
                  step >= i ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                    i < step
                      ? 'bg-primary text-primary-foreground'
                      : i === step
                        ? 'bg-primary text-primary-foreground ring-primary/30 ring-2'
                        : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  {i < step ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                </div>
                <span className="mt-1 hidden text-xs sm:block">{s.title}</span>
              </div>
            ))}
          </div>

          <Progress value={progress} className="h-2 mb-8" />
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep.id}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">{currentStep.title}</h2>
                <p className="text-muted-foreground">{currentStep.description}</p>
              </div>

              <form onSubmit={handleSubmit(handleNextStep)} className="space-y-4">
                <div className="grid gap-4">
                  {currentStep.fields.map((field) => {
                    // Skip fields that don't meet their conditions
                    if (field.condition && !field.condition(formData)) {
                      return null;
                    }

                    return (
                      <div key={field.name} className="space-y-2">
                        <Label htmlFor={field.name}>
                          {field.label}
                          {field.optional && (
                            <span className="text-muted-foreground text-xs ml-2">(optional)</span>
                          )}
                        </Label>

                        {field.type === 'radio' ? (
                          <div className="space-y-2">
                            {field.options.map((option) => (
                              <div key={option.value} className="flex items-center space-x-2">
                                <input
                                  type="radio"
                                  id={`${field.name}-${option.value}`}
                                  value={option.value}
                                  {...register(field.name)}
                                  className="h-4 w-4 text-primary"
                                />
                                <Label htmlFor={`${field.name}-${option.value}`} className="font-normal">
                                  {option.label}
                                </Label>
                              </div>
                            ))}
                          </div>
                        ) : field.type === 'textarea' ? (
                          <textarea
                            id={field.name}
                            placeholder={field.placeholder}
                            {...register(field.name)}
                            className={cn(
                              'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                              errors[field.name] && 'border-destructive'
                            )}
                          />
                        ) : (
                          <Input
                            id={field.name}
                            type={field.type}
                            placeholder={field.placeholder}
                            {...register(field.name)}
                            className={cn(errors[field.name] && 'border-destructive')}
                          />
                        )}

                        {errors[field.name] && (
                          <p className="text-sm text-destructive">
                            {errors[field.name].message}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>

                {submitError && (
                  <p className="text-destructive text-sm">{submitError}</p>
                )}

                <div className="flex justify-between mt-8">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevStep}
                    disabled={step === 0}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>

                  <Button type="submit" disabled={isSubmitting}>
                    {step === visibleSteps.length - 1 ? (
                      <>
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                        {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
                      </>

                    ) : (
                      <>
                        Next
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          </AnimatePresence>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="py-10 text-center">
          <div
            className="bg-primary/10 mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full">
            <CheckCircle2 className="text-primary h-8 w-8" />
          </div>
          <h2 className="mb-2 text-2xl font-bold">Form Submitted!</h2>
          <p className="text-muted-foreground mb-6">
            Thank you for completing the form. We&apos;ll be in touch soon.
          </p>
          <Button
            onClick={() => {
              setStep(0);
              setFormData({});
              setIsComplete(false);
              reset({});
            }}>
            Start Over
          </Button>
        </motion.div>
      )}
    </div>)
  );
}
