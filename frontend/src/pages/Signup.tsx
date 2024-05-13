import SignupQuote from "../components/SignupQuote"
import Auth from "../components/Auth"

export default function Signup() {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
                <Auth type="signup" />
        </div>
        <div>
          <SignupQuote />
        </div>
      </div>
    )
  }