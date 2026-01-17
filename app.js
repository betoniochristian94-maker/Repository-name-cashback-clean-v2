window.withdrawCashback = async function () {
  if (!auth.currentUser) {
    alert("Please login first");
    return;
  }

  const uid = auth.currentUser.uid;
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  const data = docSnap.data();
  let current = data.cashback || 0;

  if (current <= 0) {
    alert("No cashback to withdraw! 💸");
    return;
  }

  // Simulate sending to GCash
  alert(`Success! ₱${current} withdrawn to your GCash account 🎉`);

  // Reset cashback
  await setDoc(docRef, { cashback: 0 }, { merge: true });
  localStorage.setItem("cashback", 0);

  document.getElementById("cashback").innerText = 0;
  document.getElementById("withdrawMessage").innerText = "";
};
