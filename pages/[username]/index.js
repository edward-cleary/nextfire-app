import { useContext } from "react";
import { UserContext } from "@/lib/context";

export default function Page({}) {
  const { user, username } = useContext(UserContext);

  return (
    <main>
      <h1>{`You are ${username}`}</h1>
    </main>
  );
}
