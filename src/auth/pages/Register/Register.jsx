import { useState, useEffect } from "react";
import PageWrapper from "../../../shared/components/Ui/PageWrapper";
import Button from "../../../shared/components/Ui/Button";
import Card from "../../../shared/components/Ui/Card";
import googleLogo from "../../../assets/auth/google-logo.svg";
import Input from "../../../shared/components/Ui/Input";
import Label from "../../../shared/components/Ui/Label";

export default function Register() {
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dob, setDob] = useState("");

    const handleRegister = (e) => {
        e.preventDefault();
        // Implement register logic here
    };

    return (
        <PageWrapper>
            <Card
                disableHover
                customClasses="flex justify-center items-center bg-bg dark:bg-bg-dark !md:border !md:border-hover !dark:md:border !dark:md:border-hover-dark md:max-w-md dark:bg-transparent bg-transparent"
            >
                <div className="w-full p-8 space-y-8">
                    <h2 className="text-2xl font-bold text-text dark:text-text-dark text-center">
                        Register
                    </h2>
                    <form className="mt-8 space-y-6" onSubmit={handleRegister}>
                        <div>
                            <Label
                                htmlFor="fullName"
                                className="block text-sm font-medium text-text dark:text-text-dark"
                                text="Full Name"
                            />
                            <Input
                                id="fullName"
                                name="fullName"
                                type="text"
                                autoComplete="name"
                                required
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </div>
                        <div>
                            <Label
                                htmlFor="username"
                                className="block text-sm font-medium text-text dark:text-text-dark"
                                text="Username"
                            />
                            <Input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <Label
                                htmlFor="email"
                                className="block text-sm font-medium text-text dark:text-text-dark"
                                text="Email address"
                            />
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <Label
                                htmlFor="password"
                                className="block text-sm font-medium text-text dark:text-text-dark"
                                text="Password"
                            />
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <Label
                                htmlFor="dob"
                                className="block text-sm font-medium text-text dark:text-text-dark"
                                text="Date of Birth"
                            />
                            <Input
                                id="dob"
                                name="dob"
                                type="date"
                                required
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                            />
                        </div>
                        <div>
                            <Button
                                type="submit"
                                variant="primary"
                                size="md"
                                className="w-full"
                            >
                                Sign up
                            </Button>
                        </div>
                    </form>
                    <div className="mt-8 space-y-4">
                        <div className="flex justify-between items-center">
                            <hr className="w-full border-gray-300 dark:border-gray-600" />
                            <span className="px-3 text-sm text-nowrap text-text dark:text-text-dark">
                                Or continue with
                            </span>
                            <hr className="w-full border-gray-300 dark:border-gray-600" />
                        </div>
                        <div className="flex justify-between items-center mt-8 space-x-4">
                            <Card customClasses="flex-1 flex justify-center items-center p-2 cursor-pointer rounded-lg">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 22.773 22.773"
                                    className="w-5 h-5 mr-3"
                                    fill="currentColor"
                                >
                                    <path d="M15.769,0c0.053,0,0.106,0,0.162,0c0.13,1.606-0.483,2.806-1.228,3.675c-0.731,0.863-1.732,1.7-3.351,1.573c-0.108-1.583,0.506-2.694,1.25-3.561C13.292,0.879,14.557,0.16,15.769,0z" />
                                    <path d="M20.67,16.716c0,0.016,0,0.03,0,0.045c-0.455,1.378-1.104,2.559-1.896,3.655c-0.723,0.995-1.609,2.334-3.191,2.334c-1.367,0-2.275-0.879-3.676-0.903c-1.482-0.024-2.297,0.735-3.652,0.926c-0.155,0-0.31,0-0.462,0c-0.995-0.144-1.798-0.932-2.383-1.642c-1.725-2.098-3.058-4.808-3.306-8.276c0-0.34,0-0.679,0-1.019c0.105-2.482,1.311-4.5,2.914-5.478c0.846-0.52,2.009-0.963,3.304-0.765c0.555,0.086,1.122,0.276,1.619,0.464c0.471,0.181,1.06,0.502,1.618,0.485c0.378-0.011,0.754-0.208,1.135-0.347c1.116-0.403,2.21-0.865,3.652-0.648c1.733,0.262,2.963,1.032,3.723,2.22c-1.466,0.933-2.625,2.339-2.427,4.74C17.818,14.688,19.086,15.964,20.67,16.716z" />
                                </svg>
                                Apple
                            </Card>
                            <Card customClasses="flex-1 flex justify-center items-center p-2 cursor-pointer rounded-lg">
                                <img
                                    src={googleLogo}
                                    alt="Google"
                                    className="w-5 h-5 mr-3"
                                />
                                Google
                            </Card>
                        </div>
                    </div>
                </div>
            </Card>
        </PageWrapper>
    );
}
