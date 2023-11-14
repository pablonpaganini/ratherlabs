'use client'
import React, { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <div className="px-4 py-5 my-5 d-flex justify-content-center">
        <div className="card" style={{minWidth: "400px", maxWidth: "500px", backgroundColor: "#fff", border: "1px solid #dee2e6", borderRadius: "8px", padding: "20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
          <img src="https://48tools.com/wp-content/uploads/2015/09/shortlink.png" className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title text-center">Sample Survey</h5>
            <Link href="/questions/0" type="button" className="btn btn-outline-primary w-100 btn-md px-4 gap-3">Start</Link>
          </div>
        </div>
      </div>
    </main>
  )
}
