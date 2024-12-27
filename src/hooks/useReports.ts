import { useState, useEffect } from 'react';
import type { Report } from '../types';
import * as reportsApi from '../api/reports';

export function useReports(type: 'all' | 'draft' | 'submitted' = 'all') {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReports() {
      try {
        setLoading(true);
        let data: Report[];
        
        switch (type) {
          case 'draft':
            data = await reportsApi.getDraftReports();
            break;
          case 'submitted':
            data = await reportsApi.getSubmittedReports();
            break;
          default:
            data = await reportsApi.getAllReports();
        }
        
        setReports(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch reports');
      } finally {
        setLoading(false);
      }
    }

    fetchReports();
  }, [type]);

  return { reports, loading, error };
}