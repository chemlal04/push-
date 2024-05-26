// app/Repo/staffLogic.js

import {  getStudentFromDb, 
          getDriversFromDb, 
          updateDriverStatus, 
          getReportsFromDb 
        } from '../app/server/db';
export async function getStudents() {
  const res = await getStudentFromDb();
  return res;
}

export async function getDrivers() {
  return await getDriversFromDb();
}

export async function toggleDriverStatus(id, status) {
  return await updateDriverStatus(id, status);
}

export async function getReports(reporterId, reportedUserId) {
  const reports = await getReportsFromDb(reporterId, reportedUserId);
  return reports;
}