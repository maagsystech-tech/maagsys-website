import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, limit, getDocs, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export function useCollection(collectionName, constraints = [], limitCount = null) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const buildQuery = () => {
      let q = collection(db, collectionName);
      const queryConstraints = [];

      const processConstraint = (c) => {
        if (Array.isArray(c) && c.length === 3) {
          queryConstraints.push(where(c[0], c[1], c[2]));
        } else if (c && typeof c === 'object') {
          queryConstraints.push(c);
        }
      };

      if (Array.isArray(constraints)) {
        constraints.forEach(processConstraint);
      } else {
        processConstraint(constraints);
      }

      if (typeof limitCount === 'number') {
        queryConstraints.push(limit(limitCount));
      } else if (limitCount) {
        processConstraint(limitCount);
      }

      return queryConstraints.length > 0 ? query(q, ...queryConstraints) : query(q);
    };

    let unsubscribe = () => {};

    try {
      unsubscribe = onSnapshot(
        buildQuery(),
        (snapshot) => {
          const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          docs.sort((a, b) => {
            const aTime = a.createdAt?.seconds || (a.createdAt ? new Date(a.createdAt).getTime() / 1000 : 0);
            const bTime = b.createdAt?.seconds || (b.createdAt ? new Date(b.createdAt).getTime() / 1000 : 0);
            return bTime - aTime;
          });
          setData(docs);
          setLoading(false);
        },
        async (err) => {
          console.warn(`onSnapshot Query failed for ${collectionName}, attempting fallback fetch...`, err);
          // Fallback fetch all collection docs
          try {
            const snap = await getDocs(collection(db, collectionName));
            const docs = snap.docs
              .map(doc => ({ id: doc.id, ...doc.data() }))
              .filter(d => d.published !== false);
            docs.sort((a, b) => {
              const aTime = a.createdAt?.seconds || (a.createdAt ? new Date(a.createdAt).getTime() / 1000 : 0);
              const bTime = b.createdAt?.seconds || (b.createdAt ? new Date(b.createdAt).getTime() / 1000 : 0);
              return bTime - aTime;
            });
            setData(docs);
          } catch (fallbackErr) {
            console.error(`Fallback fetch failed for ${collectionName}:`, fallbackErr);
            setError(fallbackErr);
          }
          setLoading(false);
        }
      );
    } catch (e) {
      console.error(`Error setting up query for ${collectionName}:`, e);
      setLoading(false);
    }

    return () => unsubscribe();
  }, [collectionName]);

  return { data, loading, error };
}

export function useDocument(collectionName, docId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!docId) { setLoading(false); return; }

    const unsubscribe = onSnapshot(
      doc(db, collectionName, docId),
      (snapshot) => {
        if (snapshot.exists()) {
          setData({ id: snapshot.id, ...snapshot.data() });
        } else {
          setData(null);
        }
        setLoading(false);
      },
      (err) => {
        console.error(`Error fetching doc ${docId}:`, err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [collectionName, docId]);

  return { data, loading, error };
}

// export function useSettings() {
//   const [settings, setSettings] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onSnapshot(
//       doc(db, 'settings', 'general'),
//       (snapshot) => {
//         if (snapshot.exists()) {
//           setSettings(snapshot.data());
//         }
//         setLoading(false);
//       },
//       () => setLoading(false)
//     );
//     return () => unsubscribe();
//   }, []);

//   return { settings, loading };
// }


export function useSettings() {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, 'settings', 'general'),
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          setSettings(data);
          // Directly sync theme to HTML root element
          document.documentElement.setAttribute('data-theme', data.theme || 'blue');
        } else {
          // Fallback if settings document doesn't exist yet
          document.documentElement.setAttribute('data-theme', 'blue');
        }
        setLoading(false);
      },
      () => {
        document.documentElement.setAttribute('data-theme', 'blue');
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  return { settings, loading };
}