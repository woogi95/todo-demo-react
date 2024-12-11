import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import TodoAdd from "./pages/todo/TodoAdd";
import About from "./pages/About";
import Index from "./pages/todo/Index";
import TodoEdit from "./pages/todo/TodoEdit";
import TodoDetail from "./pages/todo/TodoDetail";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import { TodoProvider } from "./contexts/TodoContext";
import { UserProvider } from "./contexts/UserContext";
import { ThemeJinProvider } from "./contexts/ThemeJinContext";

function App() {
  return (
    <TodoProvider>
      <Router>
        <UserProvider>
          <ThemeJinProvider>
            <Layout>
              <Routes>
                {/* 소개 */}
                <Route path="/" element={<About />} />
                {/* Todo 중첩 */}
                <Route path="/todo">
                  <Route index element={<Index />}></Route>
                  <Route path="add" element={<TodoAdd />}></Route>
                  <Route path="detail" element={<TodoDetail />}></Route>
                  <Route path="edit/:id" element={<TodoEdit />}></Route>
                </Route>
                {/* 잘못된 패스 */}
                <Route path="*" element={<NotFound />}></Route>
              </Routes>
            </Layout>
          </ThemeJinProvider>
        </UserProvider>
      </Router>
    </TodoProvider>
  );
}

export default App;
