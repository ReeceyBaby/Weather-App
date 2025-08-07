'use client';
import * as React from 'react';
import { useState, useEffect, useMemo } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Badge } from "./components/badge";
import { Calendar, Clock } from "lucide-react";
import { InputLabel } from "./components/input-label";
import { TableColProps, FeatureProps, TableColDisplayProperties } from "./types";
import { TextField } from "@mui/material";
import LinearProgress from '@mui/material/LinearProgress';

const tableCols: TableColProps[] = [
  { title: 'Description', property: 'description', sort: true, display: 'text', width: '50%' },
  { title: 'Certainty', property: 'certainty', sort: true, display: 'badge', width: '10%' },
  { title: 'Effective', property: 'effective', sort: true, display: 'date', width: '10%' },
  { title: 'Severity', property: 'severity', sort: true, display: 'badge', width: '10%' },
  { title: 'Urgency', property: 'urgency', sort: false, display: 'badge', width: '10%' },
  { title: 'Sender Name', property: 'senderName', sort: false, display: 'name', width: '10%' },
];

export default function Home() {
  // Data states
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [alerts, setAlerts] = useState<FeatureProps[]>([]);
  const [alertSync, setAlertSync] = useState<Date | null>(null);
  const [alertSort, setAlertSort] = useState<string>('description-desc');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [alertId, setAlertId] = useState<string>('');
  const [dateRange, setDateRange] = useState<string []>([]);

  const API = 'https://api.weather.gov/alerts';

  useEffect(() => {
    const fetchWeather = async()=> {
      try {
        const response = await fetch(`${API}?limit=20`);
        
        if (response.ok) {
          const alertData = await response.json();

          // Deconstruct payload object
          const { features: alerts } = alertData;
          setAlerts(alerts);
          setAlertSync(new Date());          
        } else {
          console.error(`API "${API}" is currently unavailable...`, response)
        }

      } catch (error) {
        console.log('There was an error', error);
      }
      setIsLoading(false);
   }
   fetchWeather();
  }, []);

  const sortedAlerts = useMemo(() => {
    const sorted = [...alerts];

    switch (alertSort) {
      case 'description-asc':
        sorted.sort((a, b) => a.properties.description.localeCompare(b.properties.description));
        break;
      case 'description-desc':
        sorted.sort((a, b) => b.properties.description.localeCompare(a.properties.description));
        break;
      case 'certainty-asc':
        sorted.sort((a, b) => a.properties.certainty.localeCompare(b.properties.certainty));
        break;
      case 'certainty-desc':
        sorted.sort((a, b) => b.properties.certainty.localeCompare(a.properties.certainty));
        break;
      case 'effective-asc':
        sorted.sort((a, b) => new Date(a.properties.effective).getTime() - new Date(b.properties.effective).getTime());
        break;
      case 'effective-desc':
        sorted.sort((a, b) => new Date(b.properties.effective).getTime() - new Date(a.properties.effective).getTime());
        break;
      case 'severity-asc':
        sorted.sort((a, b) => a.properties.severity.localeCompare(b.properties.severity));
        break;
      case 'severity-desc':
        sorted.sort((a, b) => b.properties.severity.localeCompare(a.properties.severity));
        break;
    }
    
    return sorted;
  }, [alerts, alertSort]);

  const updateTableSort = (sortBy: string) => {
    let updatedSort = alertSort;
    const currentSortSplit = alertSort.split('-');
    //
    if (currentSortSplit[0] === sortBy) {
      // Toggle asc/desc
      updatedSort = `${currentSortSplit[0]}-${(currentSortSplit[1] === 'desc') ? 'asc' : 'desc'}`;
    } else {
      updatedSort = `${sortBy}-desc`;
    }
    //
    setAlertSort(updatedSort);
  };

  const updateDateRanges = (value: string, startEnd: 'start' | 'end') => {
    let currentRanges = [...dateRange];
    //
    if (value.length === 0) {
      currentRanges = [];
    } else {
      if (currentRanges.length === 2) {
        currentRanges[startEnd === 'start' ? 0 : 1] = value;
      } else {
        currentRanges.push(value)
      }
      currentRanges.sort();      
    }
    //
    setDateRange(currentRanges);
  }

  const formatDateFromData = (date: Date) => {
    const dateRef = new Date(`${date}`).toLocaleDateString();
    return dateRef.replace(/\//g, '-').split('-').reverse().join('-');
  }

  const FormatDateTime = ({ date, time } : { date: string; time: string }) => {
    return (
      <div className="flex flex-col md:flex-row md:items-center gap-2 text-xs">
        <div className="flex items-center gap-1">
          <span className="hidden md:inline-block"><Calendar color="#777" strokeWidth={1.5} size={16} /></span>
          {date}
        </div>
        <div className="flex items-center gap-1">
          <span className="hidden md:inline-block"><Clock color="#777" strokeWidth={1.5} size={16} /></span>
          {time}
        </div>
      </div>
    )
  }

  const TableCellFormatted = ({ cellMeta, value } : { cellMeta: TableColProps, value: unknown }) => {
    return (
      <TableCell className="font-inter-tight h-22">
        {(() => {
          switch (cellMeta.display) {
            case 'text':
              return <span className='block max-h-13 overflow-y-scroll text-xs'>{`${value}`}</span>;
            case 'date':
              let formattedDate = '';
              let formattedTime = '';

              if (!isNaN(Date.parse(`${value}`))) {
                formattedDate = new Date(`${value}`).toLocaleDateString();
                formattedTime = new Date(`${value}`).toLocaleTimeString();
              }

              return (
                <FormatDateTime date={formattedDate} time={formattedTime} />
              );
            case 'badge':
              return <Badge value={`${value}`} />;
            case 'name':
              return <span className='block max-h-13 overflow-y-scroll text-xs text-center text-balance'>{`${value}`}</span>;
            default:
              return null;
          }
        })()}
      </TableCell>
    )
  };

  const DialogMeta = ({ title, value } : { title: string, value: string }) => {
    return (
      <li className="flex flex-col justify-center text-center gap-1">
        <h6 className="mb-1 text-black text-xs uppercase">{title}</h6>
        <Badge value={value} />
      </li>
    )
  }

  // Alerts filtered by search term 'searchTerm'
  let filteredAlerts: FeatureProps[] = sortedAlerts.filter((alert: FeatureProps) =>  alert.properties.description.toLowerCase().includes(searchTerm.toLowerCase()));

  // Alerts filtered by date range
  if (dateRange.length === 2) {
    filteredAlerts = filteredAlerts.filter((alert: FeatureProps) => formatDateFromData(alert.properties.effective) >= dateRange[0] && formatDateFromData(alert.properties.effective) <= dateRange[1])
  }

  // Referenced within dialog
  const selectedAlert = alerts.find(alert => alert.id === alertId);

  return (
    <div className="relative z-0 pt-18 md:pt-28 pb-18 flex flex-col gap-9 md:gap-12">
    dateRange = {JSON.stringify(dateRange)}
      <div className="flex flex-col gap-6">
        <h1 className="text-5xl inter-tight text-black">Hello staff@hbkworld.com</h1>
        <h2 className="text-4xl inter-tight text-black">Welcome to your Weather app</h2>
        <p className="text-lg leading-[1.4] md:w-2/3 text-balance">From the interface below you are able to: review the lastest weather alerts, sorts alerts, search alerts, filter by date range &amp; click on alert row to see more details...</p>
        <div className="flex flex-row gap-2">
          <span className="uppercase text-xs font-semibold block font-inter-tight">Last Data Sync:</span>
          {alertSync && (<FormatDateTime date={alertSync.toLocaleDateString()} time={alertSync.toLocaleTimeString()} />)}
        </div>
      </div>
      <TableContainer component={Paper} className='p-4'>
        <div className="sm:flex justify-between gap-8">
          <InputLabel label="Search weather alerts...">
            <TextField className="w-full" variant="standard" size="small" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)} />
          </InputLabel>
          <div className="flex flex-row gap-3 mt-8 sm:mt-0">
            <InputLabel label="Start date...">
              <TextField className="w-full" variant="standard" size="small" type="date" onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateDateRanges(e.target.value, 'start')} value={dateRange[0] || ''} />
            </InputLabel>
            <InputLabel label="End date...">
              <TextField className="w-full" variant="standard" size="small" type="date" onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateDateRanges(e.target.value, 'end')} value={dateRange[1] || ''} />
            </InputLabel>
          </div>
        </div>
      </TableContainer>
      <TableContainer component={Paper}>
      {isLoading ?
        <div className="p-12 pb-16 flex flex-col gap-12">
          <h6 className="w-full block uppercase font-inter-tight text-sm font-semibold text-center">Loading...</h6>
          <LinearProgress color="inherit" />
          <LinearProgress color="inherit" />
          <LinearProgress color="inherit" />
          <LinearProgress color="inherit" />
          <LinearProgress color="inherit" />
          <LinearProgress color="inherit" />
          <LinearProgress color="inherit" />
          <LinearProgress color="inherit" />
          <LinearProgress color="inherit" />
          <LinearProgress color="inherit" />
        </div>
      :
        <Table sx={{ minWidth: 650 }} aria-label="weather data table">
          <TableHead>
            <TableRow>
              {tableCols.map((col: TableColProps, index: number) => {
                const sortSplit = alertSort.split('-');
                const direction: 'asc' | 'desc' = sortSplit[1] === 'asc' ? 'asc' : 'desc';
                return (
                  <TableCell key={`${col.property}-${index}`} width={col.width || 'auto'}>
                    <span className="w-full uppercase font-inter-tight text-sm font-semibold">
                      {col.sort ? 
                        <TableSortLabel
                          active={col.property === sortSplit[0]}
                          direction={direction}
                          onClick={() => updateTableSort(col.property)}
                          className={`[&>svg]:bg-[#888] [&>svg]:rounded-full [&>svg]:p-[2px] [&>svg]:!text-white ${index !== 0 && 'text-center'}`}
                        >
                          <span className="font-inter-tight">{col.title}</span>
                        </TableSortLabel>
                      :
                        <span className="w-full block text-center font-inter-tight">{col.title}</span>
                      }
                    </span>
                  </TableCell>
                )
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAlerts.length > 0 ? null : <TableRow><TableCell colSpan={tableCols.length}><span className="w-full block uppercase font-inter-tight text-sm font-semibold text-center">No alerts to display...</span></TableCell></TableRow>}
            {filteredAlerts.map((alert: FeatureProps, index: number) => {
              return (
                <TableRow
                  key={`${alert.id}-${index}`}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  onClick={() => setAlertId(alert.id)}
                  className="lg:transition-all lg:duration-300 lg:hover:bg-neutral-100 lg:hover:cursor-pointer"
                >
                {tableCols.map((col: TableColProps, index: number) => {
                  const cellRef: TableColDisplayProperties = col.property;
                  return (
                    <TableCellFormatted cellMeta={col} value={alert.properties[cellRef]} key={`${col.property}-${index}`} />
                  );
                })}
              </TableRow>
              );
            })}
          </TableBody>
        </Table>
      }
      </TableContainer>
      <Dialog open={alertId !== ''} onClose={() => setAlertId('')} maxWidth="md">
        <DialogTitle>{selectedAlert?.properties.headline}</DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-8 my-6">
            <ul className="flex flex-row gap-6">  
              {selectedAlert?.properties?.category && <DialogMeta title="category" value={selectedAlert?.properties?.category} />}
              {selectedAlert?.properties?.severity && <DialogMeta title="severity" value={selectedAlert?.properties?.severity} />}
              {selectedAlert?.properties?.status && <DialogMeta title="status" value={selectedAlert?.properties?.status} />}
              {selectedAlert?.properties?.urgency && <DialogMeta title="urgency" value={selectedAlert?.properties?.urgency} />}
              {selectedAlert?.properties?.response && <DialogMeta title="response" value={selectedAlert?.properties?.response} />}
              {selectedAlert?.properties?.scope && <DialogMeta title="scope" value={selectedAlert?.properties?.scope} />}
            </ul>
            {selectedAlert?.properties.areaDesc && (
              <div>
                <h6 className="mb-1 text-black text-sm uppercase">Area</h6>
                <p className="text-xs">{selectedAlert?.properties.areaDesc}</p>
              </div>
            )}
            {selectedAlert?.properties.description && (
              <div>
                <h6 className="mb-1 text-black text-sm uppercase">Description</h6>
                <p className="text-xs">{selectedAlert?.properties.description}</p>
              </div>
            )}
            {selectedAlert?.properties.instruction && (
              <div>
                <h6 className="mb-1 text-black text-sm uppercase">Instructions</h6>
                <p className="text-xs">{selectedAlert?.properties.instruction}</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>   
    </div>
  );
}
