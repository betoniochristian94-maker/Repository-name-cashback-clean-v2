window.addCashback = async function () {
  if (!auth.currentUser) {
    alert("Please login first");
    return;
  }

  const uid = auth.currentUser.uid;
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  const data = docSnap.data();
  const today = new Date().toISOString().split("T")[0];

  // ❌ Already added today
  if (data.lastAdded === today) {
    alert("You already claimed today's cashback 💸");
    return;
  }

  // ✅ Add cashback
  let current = data.cashback || 0;
  current += 10;

  await setDoc(docRef, {
    cashback: current,
    lastAdded: today
  }, { merge: true });

  localStorage.setItem("cashback", current);
  document.getElementById("cashback").innerText = current;

  alert("₱10 cashback added 🎉");
};
