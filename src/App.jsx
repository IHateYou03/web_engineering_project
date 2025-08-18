import "./App.css";
import { ThemeProvider, useTheme } from "./components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Monitor } from "lucide-react";
import { BrowserRouter } from "react-router";
import Auth from "./pages/auth";

function App() {
  return (
    <BrowserRouter basename="/dev5">
      <Auth />
    </BrowserRouter>
  );
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      {theme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : theme === "light" ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Monitor className="h-4 w-4" />
      )}
    </Button>
  );
}

/*function loginWebEngOauth25() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      fetch("https://git.imn.htwk-leipzig.de/oauth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id:
            "4831a63cd36a17304c24e15c818879e212767a6ce0483a3e98d9dad8c37004a6",
          client_secret:
            "gloas-2925de18eef6d878e96e58a279003b8987d1824a8a55a15fb52b084d847993ea", // Important: This is not secure!
          code: code,
          grant_type: "authorization_code",
          redirect_uri: REDIRECT_URI,
        }).toString(),
      })
        .then((response) => response.json())
        .then((data) => {
          const { access_token } = data;
          console.log("Access Token:", access_token);

          // Fetch user data with the access token
          fetch("https://git.imn.htwk-leipzig.de/api/v4/user", {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          })
            .then((res) => res.json())
            .then((userData) => {
              console.log("User Data:", userData);
              setUser(userData);
            })
            .catch((err) => {
              console.error("Error fetching user data:", err);
            });
        })
        .catch((err) => {
          console.error("Error getting access token:", err);
        });
    }
  }, []);

  const handleLogin = () => {
    // Redirect user to GitLab authorization endpoint
    window.location.href = `https://git.imn.htwk-leipzig.de/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=read_user`;
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>GitLab OAuth Example</h1>
        {user ? (
          <div>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
          </div>
        ) : (
          <button onClick={handleLogin}>Login with GitLab</button>
        )}
      </header>
    </div>
  );
}*/

export default App;
