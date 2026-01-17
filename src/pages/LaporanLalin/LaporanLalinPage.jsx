import dayjs from "dayjs";

import { useEffect, useMemo, useState } from "react";
import { Box, Button, TextField, CircularProgress } from "@mui/material";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchLalin } from "@/features/lalin/lalinSlice";
import { fetchGerbangs } from "@/features/gerbang/gerbangSlice";

import LalinDailyTable from "@/components/tables/LalinDailyTable";
import LalinDetailModal from "@/components/modals/LalinDetailModal";

import { mapLalinWithGerbang, buildDailyPaymentSummary } from "@/utils/lalinHelper";

const LaporanLalinPage = () => {
  const dispatch = useAppDispatch();
  const [tanggal, setTanggal] = useState("");
  const [isSearchAll, setIsSearchAll] = useState(false);
  const [detailModal, setDetailModal] = useState({
    open: false,
    type: "",
    label: "",
  });

  const { data: lalinData, isLoading } = useAppSelector((state) => state.lalin);
  const { data: gerbangData } = useAppSelector((state) => state.gerbang);

  const defaultTanggal = useMemo(() => {
    if (!lalinData.length) return ''

    return dayjs(lalinData[0].Tanggal).format('YYYY-MM-DD')
  }, [lalinData])
  
  const selectedTanggal = useMemo(() => {
    if (isSearchAll) return null
    return tanggal || defaultTanggal
  }, [tanggal, defaultTanggal, isSearchAll])

  useEffect(() => {
    dispatch(fetchGerbangs({ search: '', page: 1 }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchLalin({
        tanggal: selectedTanggal,
        isSearchAll,
      }),
    );

  }, [selectedTanggal, dispatch, isSearchAll]);

  const summaryData = useMemo(() => {
    return buildDailyPaymentSummary(lalinData);
  }, [lalinData]);

  const mergedData = useMemo(
    () => mapLalinWithGerbang(lalinData, gerbangData),
    [lalinData, gerbangData],
  );

  const handleOpenDetail = (type, label) => {
    setDetailModal({
      open: true,
      type,
      label,
    });
  };

  const handleResetTanggal = () => {
    setIsSearchAll(true)
    setTanggal(null)
  }

  return (
    <Box p={3}>
      {/* ================= FILTER ================= */}
      <Box display="flex" gap={2} mb={3}>
        <TextField
          type="date"
          value={selectedTanggal || ""}
          onChange={(e) => {
            setTanggal(e.target.value)
            setIsSearchAll(false)
          }}
        />

        <Button
          variant="outlined"
          color="secondary"
          onClick={handleResetTanggal}
        >
          Reset
        </Button>
      </Box>

      {/* SUMMARY */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(180px, 1fr))"
        gap={2}
        mb={3}
      >
        {summaryData.map((item, key) => (
          <Box
            key={key}
            p={2}
            borderRadius={3}
            bgcolor="#fff"
            boxShadow="0 4px 12px rgba(0,0,0,0.06)"
            textAlign="center"
          >
            <Box fontSize={12} fontWeight={600} color="text.secondary" mb={1}>
              {item.label}
            </Box>

            <Box fontSize={22} fontWeight={700} color="text.primary">
              {item.total}
            </Box>
          </Box>
        ))}
      </Box>

      {/* ================= TABLE SUMMARY ================= */}
      <LalinDailyTable data={summaryData} onDetail={handleOpenDetail} />

      {/* ================= LOADING ================= */}
      {isLoading && (
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress />
        </Box>
      )}

      {/* ================= MODAL DETAIL ================= */}
      <LalinDetailModal
        open={detailModal.open}
        onClose={() => setDetailModal({ open: false, type: "", label: "" })}
        data={mergedData}
        type={detailModal.type}
        label={detailModal.label}
      />
    </Box>
  );
};

export default LaporanLalinPage;
