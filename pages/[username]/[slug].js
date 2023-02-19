import styles from "../../styles/Post.module.css";
import { getUserWithUsername } from "@/lib/firebase";
import { firestore } from "@/lib/firebase";
import { postToJSON } from "@/lib/firebase";
import {
  collectionGroup,
  getDocs,
  query,
  doc,
  getDoc,
} from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import PostContent from "@/components/PostContent";

export async function getStaticProps({ params }) {
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username);

  let post;
  let path;

  if (userDoc) {
    const postRef = doc(firestore, userDoc.ref.path, "posts", slug);

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

  const paths = querySnapshot.docs.map((doc) => {
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

export default function PostPage(props) {
  const postRef = doc(firestore, props.path);
  const [realtimePost] = useDocumentData(postRef);

  const post = realtimePost || props.post;

  return (
    <main className={styles.container}>
      <section>
        <PostContent post={post} />
      </section>
      <aside className="card">
        <p>
          <strong>{post.heartCount || 0} ❤️</strong>
        </p>
      </aside>
    </main>
  );
}
