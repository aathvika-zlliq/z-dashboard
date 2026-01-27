import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { connect } from "react-redux";
import toast from "react-hot-toast";

import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";
import { setToken } from "../../utils/localstorage.js";
import { postLoginData } from "../../actions";

/* -------------------------
   Types
-------------------------- */
type LoginPayload = {
  username: string;
  password: string;
};

type Props = {
  postLoginData: (payload: LoginPayload) => Promise<any>;
};

/* -------------------------
   Component
-------------------------- */
function SignInForm({ postLoginData }: Props) {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [form, setForm] = useState<LoginPayload>({
    username: "aathvika+100@zlliq.com",
    password: "mKzZNW`Zo7",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await postLoginData(form);
      console.log(result);
      setToken(result.api_key);
      localStorage.setItem("jwtToken", result.api_key);
      toast.success("Login successful 🎉");

      // ✅ Reliable redirect AFTER toast
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000); // match toast duration
    } catch (err: any) {
      // ✅ REAL API MESSAGE (your response structure)
      const errorMessage =
        err?.error?.error_message || // "Invalid credentials"
        err?.message || // fallback
        "Login failed";

      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div className="mb-5 sm:mb-8">
          <h1 className="mb-2 font-semibold text-gray-800 text-title-sm">
            Sign In
          </h1>
          <p className="text-sm text-gray-500">
            Enter your email and password to sign in!
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Email */}
            <div>
              <Label>
                Email <span className="text-error-500">*</span>
              </Label>
              <Input
                name="username"
                placeholder="info@gmail.com"
                value={form.username}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div>
              <Label>
                Password <span className="text-error-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                >
                  {showPassword ? (
                    <EyeIcon className="size-5 fill-gray-500" />
                  ) : (
                    <EyeCloseIcon className="size-5 fill-gray-500" />
                  )}
                </span>
              </div>
            </div>

            {/* Remember me */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Checkbox checked={isChecked} onChange={setIsChecked} />
                <span className="text-sm text-gray-700">Keep me logged in</span>
              </div>

              <Link to="#!" className="text-sm text-brand-500">
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full" size="sm">
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* -------------------------
   Redux connect
-------------------------- */
const mapDispatchToProps = (dispatch: any) => ({
  postLoginData: (payload: LoginPayload) => dispatch(postLoginData(payload)),
});

export default connect(null, mapDispatchToProps)(SignInForm);
