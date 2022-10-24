import React from "react";
import { QueryClientProvider, QueryClient } from 'react-query'
import {ReactQueryDevtoolsPanel, ReactQueryDevtools} from 'react-query/devtools'
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import { RQSuperheroes } from "./components/RQSuperheroes";
import { HomePage } from "./components/HomePage";
import { Superheroes } from "./components/Superheroes";
import { RQSuperherodetail } from "./components/RQSuperherodetail";
import ParalleQueries from "./components/ParalleQueries";
import { DynamicParallelpage } from "./components/DynamicParallelpage";
import { DependentQuery } from "./components/DependentQuery";
import { PaginatedQuery } from "./components/PaginatedQuery";
import { InfiniteQuery } from "./components/InfiniteQuery";



function App() {
  const NavLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? 'bold' : 'normal',
      textDecoration: isActive ? 'none' : 'underline',
    }
  }

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <nav>
          <ul>
            <NavLink style={NavLinkStyles} to='/'>HomePage</NavLink>
            <NavLink style={NavLinkStyles} to='super-heroes'>Superheroes</NavLink>
            <NavLink style={NavLinkStyles} to='rq-super-heroes'>RQSuperheroes</NavLink>
            <NavLink style={NavLinkStyles} to='rq-parallel'>ParalleQueries</NavLink>
            <NavLink style={NavLinkStyles} to='rq-dynamic-parallel'>DynamicParalleQueries</NavLink>
            <NavLink style={NavLinkStyles} to='rq-dependent'>DependentQueries</NavLink>
            <NavLink style={NavLinkStyles} to='rq-paginated'>PaginatedQueries</NavLink>
            <NavLink style={NavLinkStyles} to='rq-infinite'>InfinitQueries</NavLink>
          </ul>
        </nav>
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='super-heroes' element={<Superheroes />}></Route>
          <Route path='rq-super-heroes' element={<RQSuperheroes />}></Route>
          <Route path='rq-super-heroes/:heroId' element={<RQSuperherodetail />}></Route>
          <Route path='rq-parallel' element={<ParalleQueries />}></Route>
          <Route path='rq-dynamic-parallel' element={<DynamicParallelpage heroIds={[1, 3]}/>}></Route>
          <Route path='rq-dependent' element={<DependentQuery email='alphaydy@gmail.com' />}></Route>
          <Route path='rq-paginated' element={<PaginatedQuery />}></Route>
          <Route path='rq-infinite' element={<InfiniteQuery />}></Route>
        </Routes> 
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right'/>
      {/* <ReactQueryDevtoolsPanel setIsOpen={false} position='bottom'></ReactQueryDevtoolsPanel> */}
    </QueryClientProvider>
  );
}

export default App;
