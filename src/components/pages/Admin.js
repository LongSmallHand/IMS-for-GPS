import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../acomponent/theme";
import Sidebar from "../acomponent/Sidebar";
import Topbar from "../acomponent/Topbar";
import Team from "../acomponent/team";
import Dashboard from "../acomponent/dashboard";
import FAQ from "../acomponent/faq";
import Form from "../acomponent/form";
import Line from "../acomponent/line";
import Calendar from "../acomponent/calendar";
import Geography from "../acomponent/geography";
import Invoices from "../acomponent/invoices";
import Device from "../acomponent/device";

function Admin() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard/>} />
              {/* <Route path='team' element={<Team/>}/>           */}
              <Route path='device' element={<Device/>}/>
              <Route path='invoices' element={<Invoices/>}/>
              <Route path='form' element={<Form/>}/>
              <Route path='line' element={<Line/>}/>
              <Route path='faq' element={<FAQ/>}/>
              {/* <Route path="calendar" element={<Calendar />} /> */}
              <Route path="geography" element={<Geography />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default Admin;