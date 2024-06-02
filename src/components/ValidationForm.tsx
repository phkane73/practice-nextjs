import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import axios from "axios";
import { toast } from "sonner";
import { ActiveYn, User } from "./TableUser";
import { Switch } from "./ui/switch";

export interface IValidationFormProps {
  childRender: Function;
  user?: User;
}

const ValidationForm: React.FC<IValidationFormProps> = ({
  childRender,
  user,
}) => {
  const formSchema = z.object({
    fullname: z.string().min(1, {
      message: "Full name is required",
    }),
    username: z.string().min(1, {
      message: "Username is required",
    }),
    role: z.string().min(1, {
      message: "Role is required",
    }),
    projects: z.string().min(1, {
      message: "Projects is required",
    }),
    activeYn: z.enum([ActiveYn.Y, ActiveYn.N], {
      required_error: "Active is require",
    }),
  });

  const createForm = useForm<User>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: user?.fullname ?? "",
      username: user?.username ?? "",
      role: user?.role ?? "",
      projects: user?.projects.toString() ?? "",
      activeYn: user?.activeYn ?? ActiveYn.Y,
    },
  });

  const { reset } = createForm;

  const onSubmit = async (values: User) => {
    if (user) {
      const res = await axios
        .patch(
          process.env.NEXT_PUBLIC_SERVER_URL! + `/user/update/${user.username}`,
          {
            ...values,
            projects: Array.isArray(values.projects)
              ? values.projects
              : values.projects.split(",").map((item) => item.trim()),
          }
        )
        .catch((err) => {
          toast.error(err.response.data.message);
        });
      if (res) {
        toast.success("Edit user success!!!");
        childRender();
      }
    } else {
      const res = await axios
        .post(process.env.NEXT_PUBLIC_SERVER_URL! + "/user/insert", {
          ...values,
          projects: Array.isArray(values.projects)
            ? values.projects
            : values.projects.split(",").map((item) => item.trim()),
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
      if (res) {
        toast.success("Add user success!!!");
        reset();
        childRender();
      }
    }
  };

  return (
    <Form {...createForm}>
      <form
        onSubmit={createForm.handleSubmit(onSubmit)}
        className="grid gap-4 py-4"
      >
        <FormField
          control={createForm.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={createForm.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter Full Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={createForm.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Developer">Developer</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={createForm.control}
          name="projects"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Projects</FormLabel>
              <FormControl>
                <Input placeholder="Enter Projects" {...field} />
              </FormControl>
              <FormDescription>
                You can enter multiple projects as separated by commas.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={createForm.control}
          name="activeYn"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Active</FormLabel>
                <FormDescription>Choose active status</FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value === ActiveYn.Y}
                  onCheckedChange={(checked) =>
                    field.onChange(checked ? ActiveYn.Y : ActiveYn.N)
                  }
                  aria-readonly
                />
              </FormControl>
            </FormItem>
          )}
        />
        {user ? (
          <Button type="submit">Edit</Button>
        ) : (
          <Button type="submit">Submit</Button>
        )}
      </form>
    </Form>
  );
};

export default ValidationForm;
