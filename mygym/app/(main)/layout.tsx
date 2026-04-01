import AddButton from "@/components/add-button";
import Header from "@/components/header";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="min-h-full">
    <Header/>{children}<AddButton/></main>;
}
