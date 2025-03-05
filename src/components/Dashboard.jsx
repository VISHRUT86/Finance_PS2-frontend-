import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getExpenses } from "../services/expense";
import { getIncomes } from "../services/income";
import GoalSettingForm from "./GoalSettingForm";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
  AreaChart,
  Area,
  XAxis,
  YAxis,
} from "recharts";
import "./Dashboard.css";
import TransactionHistory from "./TransactionHistory";
import RecentH from "./RecentH"
// import Footer from "./Footer";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [userName, setUserName] = useState(""); // ✅ User name state
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // ✅ Fetch user name from local storage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserName(parsedUser.name || "User"); // ✅ Default "User" if name is missing
    }

    fetchExpenses();
    fetchIncomes();
  }, []);

  const fetchExpenses = async () => {
    try {
      const data = await getExpenses();
      setExpenses(data);
      setTotalExpenses(data.reduce((acc, expense) => acc + expense.amount, 0));
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const fetchIncomes = async () => {
    try {
      const data = await getIncomes();
      setIncomes(data);
      setTotalIncome(data.reduce((acc, income) => acc + income.amount, 0));
    } catch (error) {
      console.error("Error fetching incomes:", error);
    }
  };

  const totalBalance = totalIncome - totalExpenses;
  const pieChartData = [
    { name: "Income", value: totalIncome },
    { name: "Expenses", value: totalExpenses },
  ];

  const COLORS = ["#16dc14", "#dc3545"];
  const graphData = incomes.map((income, index) => ({
    month: `M${index + 1}`,
    income: income.amount,
    expense: expenses[index] ? expenses[index].amount : 0,
  }));

  return (
    <>
      <div className="dashboard-container">
        <div className="flex-container">
          {/* Sidebar */}
          <div className="sidebar">
            <div className="dash">
              <img className="simag" src="user.png" alt="User Avatar" />
              {/* ✅ Name ko Avatar ke Neeche Rakha */}
              <div className="user-name">
                Hello, <strong>{userName}</strong> 👋
              </div>
              <div className="sidebar1">
                <nav>
                  <ul>
                    <li>
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                      <Link to="/incomes">Incomes</Link>
                    </li>
                    <li>
                      <Link to="/expenses">Expenses</Link>
                    </li>
                    <li>
                      <Link to="/transaction-history">Transaction History</Link>
                    </li>
                    <li>
                      <Link to="/bills">Bills</Link>
                    </li>
                    {/* <li>
                      <button
                        className="goal-button"
                        onClick={() => setShowGoalForm(true)}
                      >
                        Set Annual Goal
                      </button>
                    </li> */}
                  </ul>
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="main-content">
            <div className="summary-section">
              <div className="summary-cards">
                <div className="card balance">
                  <h1>Total Balance</h1>
                  <p>₹{totalBalance}</p>
                  <div className="deposite">
                    <div className="invest">
                      
                      <img className="investimg" src="dollar.png"/>
                      <img className="investimg" src="money2.png"/>
                    </div>
                  </div>
                </div>

                <div className="summary2-cards" >


                  <div className="card2 income">
                    <h1>Income</h1>
                    <p>₹{totalIncome}</p>

                  </div>
                  <div className="card2 expenses">
                    <h1>Expenses</h1>
                    <p>₹{totalExpenses}</p>
                  </div>
                </div>
              </div>





            </div>
        <div className="recent">

            <RecentH/>
        </div>

            {/* Charts Section */}
            <div className="chart-container">
              <div className="chart-box">
                <h2>Income vs Expenses</h2>
                <ResponsiveContainer width="100%" height={300}>
                  
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={100}
                      fill="#03977a"
                      label
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                      <Label
                        value={`₹${totalBalance}`}
                        position="center"
                        fill="#03977a"
                        fontSize={20}
                      />
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="chart-box">
                <h2>Income vs Expenses (Monthly)</h2>
                {/* <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={graphData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="income"
                      stroke="#22FF22"
                      fillOpacity={0.8}
                      fill="#22FF22"
                    />
                    <Area
                      type="monotone"
                      dataKey="expense"
                      stroke="#FF0022"
                      fillOpacity={0.4}
                      fill="#FF0022"
                    />
                  </AreaChart>
                </ResponsiveContainer> */}


                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={graphData}>
                    <defs>
                      <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#16dc14" stopOpacity={1} />
                        <stop offset="95%" stopColor="#16dc14" stopOpacity={0} />
                      </linearGradient>

                      <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#dc3545" stopOpacity={1} />
                        <stop offset="95%" stopColor="#dc3545" stopOpacity={0} />
                      </linearGradient>
                    </defs>

                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />

                    <Area
                      type="monotone"
                      dataKey="income"
                      stroke="#16dc14"
                      fill="url(#incomeGradient)"
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="expense"
                      stroke="#dc3545"
                      fill="url(#expenseGradient)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Goal Setting Form with Overlay */}
      {/* {showGoalForm && (
        <>
          <div className="overlay" onClick={() => setShowGoalForm(false)}></div>
          <GoalSettingForm onClose={() => setShowGoalForm(false)} />
        </>
      )}  */}

      {/* <Footer /> */}
    </>
  );
};

export default Dashboard;





// new





// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { getExpenses } from "../services/expense";
// import { getIncomes } from "../services/income";
// import GoalSettingForm from "./GoalSettingForm";
// import axios from "axios"; // ✅ Added axios for API call
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   Label,
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
// } from "recharts";
// import "./Dashboard.css";
// import TransactionHistory from "./TransactionHistory";
// import RecentH from "./RecentH";

// const Dashboard = () => {
//   const [expenses, setExpenses] = useState([]);
//   const [incomes, setIncomes] = useState([]);
//   const [totalIncome, setTotalIncome] = useState(0);
//   const [totalExpenses, setTotalExpenses] = useState(0);
//   const [showGoalForm, setShowGoalForm] = useState(false);
//   const [userName, setUserName] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       const parsedUser = JSON.parse(storedUser);
//       setUserName(parsedUser.name || "User");
//     }

//     fetchExpenses();
//     fetchIncomes();
//     fetchDashboardSummary(); // ✅ Added dashboard summary API call
//   }, []);

//   const fetchExpenses = async () => {
//     try {
//       const data = await getExpenses();
//       setExpenses(data);
//       setTotalExpenses(data.reduce((acc, expense) => acc + expense.amount, 0));
//     } catch (error) {
//       console.error("Error fetching expenses:", error);
//     }
//   };

//   const fetchIncomes = async () => {
//     try {
//       const data = await getIncomes();
//       setIncomes(data);
//       setTotalIncome(data.reduce((acc, income) => acc + income.amount, 0));
//     } catch (error) {
//       console.error("Error fetching incomes:", error);
//     }
//   };

//   // ✅ New function to fetch dashboard summary
//   const fetchDashboardSummary = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/dashboard/summary", {
//         withCredentials: true,
//       });
//       console.log("Dashboard data:", response.data);
//       setTotalIncome(response.data.totalIncome);
//       setTotalExpenses(response.data.totalExpenses);
//     } catch (error) {
//       console.error("Error fetching dashboard summary:", error);
//     }
//   };

//   const totalBalance = totalIncome - totalExpenses;
//   const pieChartData = [
//     { name: "Income", value: totalIncome },
//     { name: "Expenses", value: totalExpenses },
//   ];

//   const COLORS = ["#16dc14", "#dc3545"];
//   const graphData = incomes.map((income, index) => ({
//     month: `M${index + 1}`,
//     income: income.amount,
//     expense: expenses[index] ? expenses[index].amount : 0,
//   }));

//   return (
//     <>
//       <div className="dashboard-container">
//         <div className="flex-container">
//           <div className="sidebar">
//             <div className="dash">
//               <img className="simag" src="user.png" alt="User Avatar" />
//               <div className="user-name">
//                 Hello, <strong>{userName}</strong> 👋
//               </div>
//               <div className="sidebar1">
//                 <nav>
//                   <ul>
//                     <li><Link to="/dashboard">Dashboard</Link></li>
//                     <li><Link to="/incomes">Incomes</Link></li>
//                     <li><Link to="/expenses">Expenses</Link></li>
//                     <li><Link to="/transaction-history">Transaction History</Link></li>
//                     <li><Link to="/bills">Bills</Link></li>
//                   </ul>
//                 </nav>
//               </div>
//             </div>
//           </div>
//           <div className="main-content">
//             <div className="summary-section">
//               <div className="summary-cards">
//                 <div className="card balance">
//                   <h1>Total Balance</h1>
//                   <p>₹{totalBalance}</p>
//                   <div className="deposite">
//                     <div className="invest">
//                       <img className="investimg" src="dollar.png" />
//                       <img className="investimg" src="money2.png" />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="summary2-cards">
//                   <div className="card2 income">
//                     <h1>Income</h1>
//                     <p>₹{totalIncome}</p>
//                   </div>
//                   <div className="card2 expenses">
//                     <h1>Expenses</h1>
//                     <p>₹{totalExpenses}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="recent"><RecentH /></div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Dashboard;

