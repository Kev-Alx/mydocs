import InputError from "@/Components/ui/InputError";
import InputLabel from "@/Components/ui/InputLabel";
import TextInput from "@/Components/ui/TextInput";
import { Button } from "@/Components/ui/button";
import { Separator } from "@/Components/ui/separator";
import { Switch } from "@/Components/ui/switch";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/Components/ui/tooltip";
import { cn } from "@/lib/utils";
import { User } from "@/types";
import { Transition } from "@headlessui/react";
import { router, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

type Props = {
    className?: string;
    user: User;
};

const EditUserPreferences = ({ className, user }: Props) => {
    const { data, setData, errors, processing, recentlySuccessful } = useForm({
        is_autosave: user.is_autosave,
        autosave_interval: user.autosave_interval,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        router.put("/profile", data);
    };
    return (
        <div
            className={cn(
                "border border-slate-300 rounded-lg  shadow",
                className
            )}
        >
            <header className="p-6 bg-slate-100">
                <h2 className="text-lg font-semibold text-gray-900">
                    Autosave Configuration
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's autosave configuration.
                </p>
            </header>
            <Separator className="w-full" />
            <form onSubmit={submit} className="mt-6 space-y-6 p-6 pt-0">
                <div className="flex justify-between">
                    <InputLabel value="Enable Autosave" />
                    <Switch
                        checked={data.is_autosave}
                        onCheckedChange={(e) => setData("is_autosave", e)}
                    />
                </div>

                <div>
                    <Tooltip>
                        <TooltipTrigger>
                            <InputLabel
                                htmlFor="interval"
                                value="Autosave Delay (ms)"
                            />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>The amount of time needed for autosave</p>
                            <p>
                                to trigger after user stops editing a document.
                            </p>
                        </TooltipContent>
                    </Tooltip>

                    <TextInput
                        id="interval"
                        type="number"
                        className="mt-1 block w-full"
                        value={data.autosave_interval}
                        onChange={(e) =>
                            setData("autosave_interval", +e.target.value)
                        }
                        required
                        autoComplete="username"
                    />

                    <InputError
                        className="mt-2"
                        message={errors.autosave_interval}
                    />
                </div>

                <div className="flex items-center gap-4">
                    <Button disabled={processing}>Save</Button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </div>
    );
};

export default EditUserPreferences;
