import React, { useState } from 'react';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({ isOpen, onClose }) => {
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTicketSubmitted(true);
    setTimeout(() => {
      setTicketSubmitted(false);
      setTicketSubject('');
      setTicketMessage('');
      onClose();
    }, 1500);
  };

  const faqs = [
    {
      q: 'How do I register for campus WiFi (eduroam)?',
      a: 'Use your campus student credentials (e.g. srujana.k@campus.edu) with WPA2-Enterprise security.',
    },
    {
      q: 'Where do I pick up physical student ID cards?',
      a: 'Visit the Registrar Office at Student Center Hall Room 102, open Mon-Fri 8:30 AM to 5:00 PM.',
    },
    {
      q: 'How do I submit late medical excuses for assignments?',
      a: 'Upload your verified health center note directly via the Assignments tab under the relevant course.',
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-[#FFFFFF] rounded-xl max-w-xl w-full p-6 sm:p-8 shadow-modal border border-black/15 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto custom-scrollbar">
        <div className="flex justify-between items-baseline pb-4 mb-4 border-b border-black/10">
          <div>
            <span className="font-sans text-[9px] uppercase tracking-[0.2em] font-bold text-black/40 block mb-1">
              Scholastic Assistance
            </span>
            <h3 className="font-serif text-[24px] font-normal text-[#1A1A1A]">Campus Support & Secretariat</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-md hover:bg-[#F4F1ED] flex items-center justify-center text-black/40 hover:text-black cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {ticketSubmitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 bg-[#E8E4DE] text-[#1A1A1A] rounded-full flex items-center justify-center mx-auto border border-black/10">
              <span className="material-symbols-outlined text-[26px]">check_circle</span>
            </div>
            <h4 className="font-serif text-[20px] font-normal text-[#1A1A1A]">Inquiry Registered</h4>
            <p className="font-sans text-[12px] text-black/60 italic">Docket #CC-94812 inscribed. A campus officer will reply via email.</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <h4 className="font-serif text-[16px] font-normal text-[#1A1A1A] mb-3">Institutional Reference FAQ</h4>
              <div className="space-y-3">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="bg-[#F4F1ED] p-4 rounded-lg border border-black/10">
                    <p className="font-sans font-bold text-[12px] text-[#1A1A1A]">{faq.q}</p>
                    <p className="font-sans text-[12px] text-black/65 mt-1 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 pt-4 border-t border-black/10">
              <h4 className="font-serif text-[16px] font-normal text-[#1A1A1A]">Submit Secretariat Inquiry</h4>

              <div>
                <input
                  type="text"
                  required
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  placeholder="Subject (e.g. Lab printer queue error)"
                  className="w-full bg-[#FFFFFF] border border-black/15 rounded-md px-3.5 py-2 font-sans text-[13px] text-[#1A1A1A] focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <textarea
                  rows={3}
                  required
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                  placeholder="Explain what issue you are experiencing..."
                  className="w-full bg-[#FFFFFF] border border-black/15 rounded-md px-3.5 py-2 font-sans text-[13px] text-[#1A1A1A] focus:outline-none focus:border-black"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-md font-sans text-[11px] uppercase tracking-[0.15em] font-semibold text-black/60 hover:bg-[#E8E4DE] transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-md font-sans text-[11px] uppercase tracking-[0.2em] font-semibold bg-[#1A1A1A] text-[#F4F1ED] hover:bg-black/80 transition-colors shadow-xs cursor-pointer"
                >
                  Submit Inquiry
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
