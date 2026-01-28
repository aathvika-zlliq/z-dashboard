import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { connect } from "react-redux";
import toast from "react-hot-toast";

import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";
import { setToken } from "../../utils/localstorage";
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
  user: any;
  token: string | null;
};

/* -------------------------
   Component
-------------------------- */
function SignInForm({ postLoginData, user, token }: Props) {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [form, setForm] = useState<LoginPayload>({
    username: "aathvika+100@zlliq.com",
    password: "mKzZNW`Zo7",
  });

  /* 🔥 LOG REDUX DATA */
  useEffect(() => {
    console.log("🟢 REDUX USER:", user);
    console.log("🟢 REDUX TOKEN:", token);
  }, [user, token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await postLoginData(form);

      console.log("🟡 API RESPONSE:", result);

      // Save token
      setToken(result.api_key);
      localStorage.setItem("jwtToken", result.api_key);

      // Save user
      if (result.user) {
        localStorage.setItem("user", JSON.stringify(result.user));
      }

      toast.success("Login successful 🎉");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err: any) {
      const errorMessage =
        err?.error?.error_message || err?.message || "Login failed";

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
            <div>
              <Label>Email *</Label>
              <Input
                name="username"
                value={form.username}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>Password *</Label>
              <div className="relative">
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? <EyeIcon /> : <EyeCloseIcon />}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Checkbox checked={isChecked} onChange={setIsChecked} />
                <span className="text-sm">Keep me logged in</span>
              </div>
              <Link to="#!" className="text-sm text-brand-500">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full">
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
const mapStateToProps = (state: any) => ({
  user: state.settingsReducer.user,
  token: state.settingsReducer.token,
});

const mapDispatchToProps = (dispatch: any) => ({
  postLoginData: (payload: LoginPayload) => dispatch(postLoginData(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);
