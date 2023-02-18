import { getUserWithUsername } from "@/lib/firebase";
import { firestore } from "@/lib/firebase";
import { postToJSON } from "@/lib/firebase";
import {
  collectionGroup,
  getDoc,
  getDocs,
  query,
  doc,
} from "firebase/firestore";

export async function getStaticProps({ params }) {
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username);

  let post;
  let path;

  if (userDoc) {
    const postRef = doc(userDoc.ref, "posts", slug);
    post = postToJSON(await getDoc(postRef));

    path = postRef.path;
  }

  return {
    props: { post, path },
    revalidate: 5000,
  };
}

export async function getStaticPaths() {
  // Improve by using Admin SDK to select empty docs
  const postsQuery = query(collectionGroup(firestore, "posts"));
  const querySnapshot = await getDocs(postsQuery);

  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data();
    return {
      params: { username, slug },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
}

export default function PostPage({}) {
  return (
    <main>
      <h1>Post Page</h1>
    </main>
  );
}
