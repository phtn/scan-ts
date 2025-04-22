import { db } from "@/lib/firebase";
import { collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

export const Recents = () => {
  // a table of recently created items
  const [list] = useCollection(collection(db, "stations"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr>
            <td>1</td>
            <td>Item 1</td>
            <td>2022-01-01</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Item 2</td>
            <td>2022-01-02</td>
          </tr> */}
          {list &&
            list.docs.map((doc) => (
              <tr key={doc.id}>
                <td>{doc.id}</td>
                <td>{doc.data().name}</td>
                <td>{doc.data().createdAt.toDate().toLocaleDateString()}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
