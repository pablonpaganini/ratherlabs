'use client'

import { useGlobalContext } from "@/contexts/store"

export default () => {
  const { wallet, setWallet, answers, setError } = useGlobalContext();

  const handleOnSubmit = async () => {
    console.log(wallet);
    try {
      const a: number[] = answers.filter((r) => r != null) as number[];
      if(a.length > 0) {
        await wallet.callSubmitMethod(1, a);
        await wallet.getQuizToken();
        setWallet(wallet.clone());
      }
    }
    catch(error: any) {
      setError(error.message);
    }
  }

  return (
    <main>
      <div className="px-4 py-5 my-5 d-flex justify-content-center">
        <div className="card" style={{ minWidth: "400px", maxWidth: "500px", backgroundColor: "#fff", border: "1px solid #dee2e6", borderRadius: "8px", padding: "20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
          <img src="https://48tools.com/wp-content/uploads/2015/09/shortlink.png" className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title text-center">Sample Survey</h5>
            <button type="button" className="btn btn-outline-primary w-100 btn-md px-4 gap-3" onClick={handleOnSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </main>
  )
}