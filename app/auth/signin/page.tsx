"use client";

import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {
  BookOpen,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  X,
  ShieldCheck,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {Alert, AlertDescription} from "@/components/ui/alert";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {useAuth} from "@/components/auth-provider";
import {useRouter} from "next/navigation";

// --------------------- Schemas ---------------------
const SignInSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
const SignUpSchema = SignInSchema.extend({
  displayName: z.string().min(2, "Name must be at least 2 characters"),
});
const OtpSchema = z.object({
  email: z.string().email("Invalid email"),
  otp: z.string().min(4, "Enter valid OTP"),
});
const ReqResetSchema = z.object({
  email: z.string().email("Invalid email"),
});
const ResetPasswordSchema = z
  .object({
    email: z.string().email("Invalid email"),
    otp: z.string().min(4, "Enter valid OTP"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// --------------------- Types ---------------------
type SignInForm = z.infer<typeof SignInSchema>;
type SignUpForm = z.infer<typeof SignUpSchema>;
type OtpForm = z.infer<typeof OtpSchema>;
type ReqResetForm = z.infer<typeof ReqResetSchema>;
type ResetPasswordForm = z.infer<typeof ResetPasswordSchema>;

// --------------------- AuthPage ---------------------
export default function AuthPage() {
  const {
    user,
    access_token,
    login,
    register: registerUser,
    verifyOtp,
    requestPasswordReset,
    resetPassword,
    error,
  } = useAuth();

  // --------------------- State ---------------------
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const [showOtp, setShowOtp] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [showDoReset, setShowDoReset] = useState(false);
  const [prefillEmail, setPrefillEmail] = useState("");

  const [showSignInPassword, setShowSignInPassword] = useState(false);
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);

  const router = useRouter();

  // --------------------- Forms ---------------------
  const signInForm = useForm<SignInForm>({
    resolver: zodResolver(SignInSchema),
  });
  const signUpForm = useForm<SignUpForm>({
    resolver: zodResolver(SignUpSchema),
  });
  const otpForm = useForm<OtpForm>({
    resolver: zodResolver(OtpSchema),
    defaultValues: {email: prefillEmail, otp: ""},
  });
  const reqResetForm = useForm<ReqResetForm>({
    resolver: zodResolver(ReqResetSchema),
  });
  const resetPassForm = useForm<ResetPasswordForm>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  // --------------------- If user logged in redirect at home page ---------------------
  useEffect(() => {
    if (user && access_token) return router.push("/");
  }, [user, access_token]);

  // --------------------- Handlers ---------------------
  const handleEmailSignIn = async (data: SignInForm) => {
    const res = await login(data.email, data.password);
    if (!res.success && res.message?.includes("Account not verified")) {
      setShowOtp(true);
      setPrefillEmail(data.email);
      otpForm.reset({email: data.email, otp: ""});
    }
  };

  const handleEmailSignUp = async (data: SignUpForm) => {
    const success = await registerUser({
      displayName: data.displayName,
      email: data.email,
      password: data.password,
    });
    if (success) {
      setPrefillEmail(data.email);
      otpForm.reset({email: data.email, otp: ""});
      setShowOtp(true);
    }
  };

  const handleVerifyOtp = async (data: OtpForm) => {
    const success = await verifyOtp(data.email, data.otp);
    if (success) {
      setShowOtp(false);
      if (activeTab === "signin") {
        await login(data.email, signInForm.getValues("password"));
      }
    }
  };

  const handleReqReset = async (data: ReqResetForm) => {
    const success = await requestPasswordReset(data.email);
    if (success) {
      resetPassForm.reset({
        email: data.email,
        otp: "",
        password: "",
        confirmPassword: "",
      });
      setShowForgot(false);
      setShowDoReset(true);
    }
  };

  const handleDoReset = async (data: ResetPasswordForm) => {
    const success = await resetPassword(data.email, data.otp, data.password);
    if (success) {
      setShowDoReset(false);
      setActiveTab("signin");
    }
  };

  // --------------------- Input Components ---------------------
  const AuthInput = ({
    id,
    type = "text",
    icon: Icon,
    placeholder,
    register,
    error,
    disabled,
  }: any) => (
    <div className="space-y-1">
      <Label htmlFor={id}>{placeholder}</Label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        )}
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          className="pl-10"
          {...register}
          disabled={disabled}
        />
      </div>
      {error && <p className="text-red-500 text-xs">{error.message}</p>}
    </div>
  );

  const PasswordInput = ({
    id,
    placeholder,
    register,
    error,
    show,
    toggle,
  }: any) => (
    <div className="space-y-1">
      <Label htmlFor={id}>{placeholder}</Label>
      <div className="relative">
        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          id={id}
          type={show ? "text" : "password"}
          placeholder={placeholder}
          className="pl-10 pr-10"
          {...register}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={toggle}
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
      </div>
      {error && <p className="text-red-500 text-xs">{error.message}</p>}
    </div>
  );

  const FormWrapper = ({onSubmit, form, children, btnText}: any) => (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4"
    >
      {children}
      <Button
        type="submit"
        className="w-full"
        disabled={form.formState.isSubmitting}
        aria-busy={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {btnText}...
          </>
        ) : (
          btnText
        )}
      </Button>
    </form>
  );

  // --------------------- UI ---------------------
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                E-Library
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                by iTax Easy
              </p>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Access your legal research platform
          </p>
        </div>

        {/* Auth Card */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-white/20 dark:border-gray-700/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-center">Sign In to Continue</CardTitle>
            <CardDescription className="text-center">
              Access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              value={activeTab}
              onValueChange={(v: any) => setActiveTab(v)}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              {/* Sign In */}
              <TabsContent value="signin">
                <FormWrapper
                  form={signInForm}
                  onSubmit={handleEmailSignIn}
                  btnText="Sign In"
                >
                  <AuthInput
                    id="signin-email"
                    type="email"
                    placeholder="Email"
                    icon={Mail}
                    register={signInForm.register("email")}
                    error={signInForm.formState.errors.email}
                  />
                  <PasswordInput
                    id="signin-password"
                    placeholder="Password"
                    register={signInForm.register("password")}
                    error={signInForm.formState.errors.password}
                    show={showSignInPassword}
                    toggle={() => setShowSignInPassword((s) => !s)}
                  />
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-gray-500">
                      <ShieldCheck className="h-4 w-4" />
                      <span>Secure Login</span>
                    </div>
                    <button
                      type="button"
                      className="text-blue-600 hover:underline"
                      onClick={() => {
                        setShowForgot(true);
                        reqResetForm.reset({
                          email: signInForm.getValues("email") || "",
                        });
                      }}
                    >
                      Forgot Password?
                    </button>
                  </div>
                </FormWrapper>
              </TabsContent>

              {/* Sign Up */}
              <TabsContent value="signup">
                <FormWrapper
                  form={signUpForm}
                  onSubmit={handleEmailSignUp}
                  btnText="Create Account"
                >
                  <AuthInput
                    id="signup-name"
                    placeholder="Full Name"
                    register={signUpForm.register("displayName")}
                    error={signUpForm.formState.errors.displayName}
                  />
                  <AuthInput
                    id="signup-email"
                    type="email"
                    placeholder="Email"
                    icon={Mail}
                    register={signUpForm.register("email")}
                    error={signUpForm.formState.errors.email}
                  />
                  <PasswordInput
                    id="signup-password"
                    placeholder="Password"
                    register={signUpForm.register("password")}
                    error={signUpForm.formState.errors.password}
                    show={showSignUpPassword}
                    toggle={() => setShowSignUpPassword((s) => !s)}
                  />
                </FormWrapper>
              </TabsContent>
            </Tabs>

            {error && (
              <Alert
                variant="destructive"
                className="mt-4"
              >
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* OTP Modal */}
        {showOtp && (
          <Modal
            title="Verify your email"
            onClose={() => setShowOtp(false)}
          >
            <FormWrapper
              form={otpForm}
              onSubmit={handleVerifyOtp}
              btnText="Verify"
            >
              <AuthInput
                id="otp-email"
                type="email"
                placeholder="Email"
                register={otpForm.register("email")}
                error={otpForm.formState.errors.email}
                disabled
              />
              <AuthInput
                id="otp-code"
                type="text"
                placeholder="OTP"
                register={otpForm.register("otp")}
                error={otpForm.formState.errors.otp}
              />
            </FormWrapper>
          </Modal>
        )}

        {/* Forgot Password Modal */}
        {showForgot && (
          <Modal
            title="Reset Your Password"
            onClose={() => setShowForgot(false)}
          >
            <FormWrapper
              form={reqResetForm}
              onSubmit={handleReqReset}
              btnText="Send OTP"
            >
              <AuthInput
                id="reset-email"
                type="email"
                placeholder="Email"
                register={reqResetForm.register("email")}
                error={reqResetForm.formState.errors.email}
              />
            </FormWrapper>
          </Modal>
        )}

        {/* Reset Password Modal */}
        {showDoReset && (
          <Modal
            title="Enter OTP & New Password"
            onClose={() => setShowDoReset(false)}
          >
            <FormWrapper
              form={resetPassForm}
              onSubmit={handleDoReset}
              btnText="Reset Password"
            >
              <AuthInput
                id="doreset-email"
                type="email"
                placeholder="Email"
                register={resetPassForm.register("email")}
                error={resetPassForm.formState.errors.email}
                disabled
              />
              <AuthInput
                id="doreset-otp"
                type="text"
                placeholder="OTP"
                register={resetPassForm.register("otp")}
                error={resetPassForm.formState.errors.otp}
              />
              <PasswordInput
                id="doreset-password"
                placeholder="New Password"
                register={resetPassForm.register("password")}
                error={resetPassForm.formState.errors.password}
                show={showResetPassword}
                toggle={() => setShowResetPassword((s) => !s)}
              />
              <PasswordInput
                id="doreset-confirm"
                placeholder="Confirm Password"
                register={resetPassForm.register("confirmPassword")}
                error={resetPassForm.formState.errors.confirmPassword}
                show={showResetPassword}
                toggle={() => setShowResetPassword((s) => !s)}
              />
            </FormWrapper>
          </Modal>
        )}

        {/* Footer */}
        <div className="text-center mt-8 text-xs text-gray-500 dark:text-gray-400">
          <p>
            © {new Date().getFullYear()} iTax Easy Private Limited. All rights
            reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

// --------------------- Reusable Modal ---------------------
const Modal = ({title, children, onClose}: any) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-sm">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-white"
      >
        <X className="h-5 w-5" />
      </button>
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
        {title}
      </h3>
      {children}
    </div>
  </div>
);
