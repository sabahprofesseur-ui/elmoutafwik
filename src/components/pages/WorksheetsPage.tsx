import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SAMPLE_WORKSHEETS } from '../../data/worksheets';
import { GRADES, ALL_SUBJECTS } from '../../data/curriculum';
import {
  FileText,
  Printer,
  Download,
  Filter,
  Eye,
  CheckCircle2,
  X,
  FileDown,
  Sparkles
} from 'lucide-react';

export const WorksheetsPage: React.FC = () => {
  const { selectedGrade, setSelectedGrade, playClick } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');
  const [activeSheetModal, setActiveSheetModal] = useState<any | null>(null);

  const categories = ['الكل', 'ملخصات', 'تمارين', 'خط وإملاء'];

  const filteredSheets = SAMPLE_WORKSHEETS.filter(ws => {
    const matchesCategory = selectedCategory === 'الكل' || ws.category === selectedCategory;
    return matchesCategory;
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 print:hidden">
        <div className="space-y-2 text-center md:text-right">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black">
            <span>مذكرات وأوراق عمل جاهزة للطباعة والتحميل 📄</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            بنك أوراق العمل والمذكرات الوزارية
          </h1>
          <p className="text-xs sm:text-sm text-white/90 max-w-xl font-medium leading-relaxed">
            تمارين تدريبية، ملخصات لقواعد النحو والرياضيات، كراسات تحسين الخط، ونماذج امتحانات منسقة وفق المقاييس التربوية الرسمية.
          </p>
        </div>

        <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-5xl shadow-inner shrink-0 animate-kid-bounce">
          📄
        </div>
      </div>

      {/* Categories Filter Strip */}
      <div className="flex flex-wrap items-center justify-between gap-4 print:hidden">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                playClick();
                setSelectedCategory(cat);
              }}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-blue-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <span className="text-xs text-slate-500 font-bold">
          {filteredSheets.length} ورقة عمل متوفرة
        </span>
      </div>

      {/* Worksheets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:hidden">
        {filteredSheets.map(sheet => {
          const grade = GRADES.find(g => g.id === sheet.gradeId);
          const subject = ALL_SUBJECTS.find(s => s.id === sheet.subjectId);

          return (
            <div
              key={sheet.id}
              className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 hover:border-blue-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black bg-blue-50 dark:bg-slate-700 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full">
                    {sheet.category} • {grade?.shortName}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">
                    {sheet.pages} صفحات • {sheet.downloadsCount} تحميلاً
                  </span>
                </div>

                <h3 className="text-base font-black text-slate-900 dark:text-white leading-snug">
                  {sheet.title}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  {sheet.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                <span className="text-xs font-bold text-orange-600 dark:text-orange-400">
                  مادة: {subject?.nameAr}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveSheetModal(sheet)}
                    className="px-4 py-2 bg-blue-50 hover:bg-blue-100 dark:bg-slate-700 text-blue-700 dark:text-blue-300 font-black text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Eye size={15} />
                    <span>معاينة وطباعة</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Printable Sheet Modal */}
      {activeSheetModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-white text-slate-900 w-full max-w-3xl rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto print:max-h-none print:shadow-none print:p-0 print:border-none">
            
            {/* Modal Controls (Hidden in print) */}
            <div className="flex items-center justify-between border-b pb-4 print:hidden">
              <span className="text-sm font-black text-blue-600">معاينة ورقة العمل الجاهزة للطباعة</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-black text-xs flex items-center gap-1.5 hover:bg-emerald-700 cursor-pointer"
                >
                  <Printer size={16} />
                  <span>طباعة فورية</span>
                </button>
                <button
                  onClick={() => setActiveSheetModal(null)}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-xl cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Official Algerian School Exam/Worksheet Header */}
            <div className="border-b-2 border-slate-900 pb-4 text-center space-y-1">
              <div className="flex justify-between items-center text-xs font-black">
                <div className="text-right">
                  <p>الجمهورية الجزائرية الديمقراطية الشعبية</p>
                  <p>وزارة التربية الوطنية</p>
                </div>
                <div className="text-3xl">🇩🇿</div>
                <div className="text-left">
                  <p>مدرسة منصة النجاح الابتدائية</p>
                  <p>السنة الدراسية: {new Date().getFullYear()}/{new Date().getFullYear() + 1}</p>
                </div>
              </div>

              <div className="pt-3">
                <h2 className="text-lg sm:text-xl font-black underline underline-offset-4">
                  {activeSheetModal.title}
                </h2>
                <div className="flex justify-around items-center pt-2 text-xs font-bold text-slate-700">
                  <span>اسم التلميذ: ............................................</span>
                  <span>القسم: ....................</span>
                  <span>العلامة: ..... / 10</span>
                </div>
              </div>
            </div>

            {/* Content items */}
            <div className="space-y-6 py-4">
              {activeSheetModal.content.map((item: string, idx: number) => (
                <div key={idx} className="space-y-4">
                  <p className="text-sm font-black text-slate-900 leading-relaxed">
                    {item}
                  </p>
                  <div className="h-16 border-b border-dashed border-slate-300" />
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t pt-4 flex justify-between items-center text-xs font-black text-slate-500">
              <span>منصة النجاح - بالتوفيق والنجاح لأبطالنا 🦊</span>
              <span>الصفحة 1 من 1</span>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
