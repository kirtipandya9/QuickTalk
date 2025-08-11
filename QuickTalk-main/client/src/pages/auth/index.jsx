import { useEffect, useState } from "react";
import Background from "@/assets/display.svg";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@radix-ui/react-tabs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { SIGNUP_ROUTE, LOGIN_ROUTE } from "@/utils/constants";
import { apiClient } from "@/lib/api-client";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";

const Auth = () => {
  const navigate = useNavigate();
  const { setUserInfo } = useAppStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpUser, setOtpUser] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setOtp(Math.floor(Math.random() * 1000000));
  }, []);

  const validateLogin = () => {
    if (!email.length) {
      toast.error("Email is required");
      return false;
    }
    if (!password.length) {
      toast.error("Password is required");
      return false;
    }
    return true;
  };

  const validateSignUp = () => {
    if (!email.length) {
      toast.error("Email is required");
      return false;
    }
    if (!password.length) {
      toast.error("Password is required");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Password and confirm password should be same");
      return false;
    }
    if (otpUser !== otp.toString()) {
      toast.error("Incorrect OTP");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (validateLogin()) {
      try {
        const response = await apiClient.post(LOGIN_ROUTE, { email, password }, { withCredentials: true });
        if (response.data.user.id) {
          setUserInfo(response.data.user);
          if (response.data.user.profileSetup) {
            navigate("/chat");
          } else {
            navigate("/profile");
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSignUp = async () => {
    if (validateSignUp()) {
      try {
        const response = await apiClient.post(SIGNUP_ROUTE, { email, password }, { withCredentials: true });
        if (response.status === 201) {
          setUserInfo(response.data.user);
          navigate("/profile");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleOtp = async () => {
    if (email === "") {
      return toast.error("Enter email first");
    }
    setLoading(true);

    try {
      await apiClient.post("/send-otp", { email, otp });
      toast.success("OTP sent successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to send OTP. Please try again.");
    }

    setLoading(false);
  };

  const handleKeyDown = (e, action) => {
    if (e.key === "Enter") {
      action();
    }
  };

  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center bg-[#EFF6FC]">
      <div className="h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2">
        <div className="flex flex-col gap-10 items-center justify-center bg-slate-50 rounded-3xl">
          <div className="flex items-center justify-center flex-col">
            <div className="flex items-center justify-center">
              <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
            </div>
            <p className="font-medium my-2 text-center text-2xl">
              Fill in the details to get started!
            </p>
          </div>
          <div className="flex items-center justify-center w-full">
            <Tabs className="w-3/4" defaultValue="login">
              <TabsList className="flex bg-transparent rounded-none w-full">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                >
                  SignUp
                </TabsTrigger>
              </TabsList>
              <TabsContent className="flex flex-col gap-5 mt-10" value="login">
                <Input
                  placeholder="Email"
                  type="email"
                  className="rounded-2xl bg-[#ECECEC] px-4 py-6 font-semibold text-base"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, handleLogin)}
                />
                <Input
                  placeholder="Password"
                  type="password"
                  className="rounded-2xl bg-[#ECECEC] px-4 py-6 font-semibold text-base"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, handleLogin)}
                />
                <Button className="rounded-2xl bg-black px-4 py-6 font-semibold text-base" onClick={handleLogin}>
                  Login
                </Button>
              </TabsContent>

              <TabsContent className="flex flex-col gap-5" value="signup">
                <Input
                  placeholder="Email"
                  type="email"
                  className={`rounded-2xl bg-[#ECECEC] px-4 py-6 font-semibold text-base ${!loading ? "hidden" : "flex"}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, handleSignUp)}
                />
                <Input
                  placeholder="Password"
                  type="password"
                  className={`rounded-2xl bg-[#ECECEC] px-4 py-6 font-semibold text-base ${!loading ? "hidden" : "flex"}`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, handleSignUp)}
                />
                <Input
                  placeholder="Confirm Password"
                  type="password"
                  className={`rounded-2xl bg-[#ECECEC] px-4 py-6 font-semibold text-base ${!loading ? "hidden" : "flex"}`}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, handleSignUp)}
                />
                <Input
                  placeholder="Enter OTP"
                  type="text"
                  className={`rounded-2xl bg-[#ECECEC] px-4 py-6 font-semibold text-base ${loading ? "hidden" : "flex"}`}
                  value={otpUser}
                  onChange={(e) => setOtpUser(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, handleSignUp)}
                />
                <Button
                  disabled={!loading}
                  className={`rounded-2xl bg-black px-4 py-6 font-semibold text-base ${!loading ? "hidden" : "flex"}`}
                  onClick={handleOtp}
                >
                  Send OTP
                </Button>
                <Button className={`rounded-2xl bg-black px-4 py-6 font-semibold text-base ${loading ? "hidden" : "flex"}`} onClick={handleSignUp}>
                  SignUp
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <div className="bg-[#FFE9E9] hidden xl:block h-[65vh] rounded-xl">
            <img src={Background} alt="display-image" className="relative left-10 -top-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
