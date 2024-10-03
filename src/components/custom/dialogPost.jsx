import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function DialogPost() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add New Post</Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-200 sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
        </DialogHeader>
        <form>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Input id="category" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="summary">Summary</Label>
              <Textarea id="summary" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="author">Author Name</Label>
              <Input id="author" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Image URL</Label>
              <Input id="image" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="url">Reference Post URL</Label>
              <Input id="url" placeholder="https://example.com/your-post" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create Post</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
