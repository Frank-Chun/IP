import { useState, useEffect, useRef } from "react";

const COLORS = {
  primary: "#1A3A6B",
  accent: "#C8941A",
  bg: "#F5F3EE",
  card: "#FFFFFF",
  text: "#1C1C1E",
  muted: "#6B6B6B",
  border: "#E2DED6",
  success: "#2D6A4F",
  danger: "#8B1A1A",
  highlight: "#EAF0FB",
};

const NAV_ITEMS = [
  { id: "home", label: "홈", icon: "🏛️" },
  { id: "law", label: "특허법 학습", icon: "📚" },
  { id: "practice", label: "실무 가이드", icon: "⚖️" },
  { id: "exam", label: "모의시험", icon: "📝" },
];

const LAW_CHAPTERS = [
  {
    id: 1,
    title: "제1장 특허권의 부여",
    subtitle: "专利权的授予",
    articles: [
      {
        no: "제2조",
        title: "발명·실용신안·디자인의 정의",
        cn: "发明、实用新型、外观设计的定义",
        content:
          "본 법에서 발명이란 제품·방법 또는 그 개량에 대해 제출된 새로운 기술방안을 말한다. 실용신안이란 제품의 형상·구조 또는 그 결합에 대해 제출된 실용성 있는 새로운 기술방안을 말한다. 디자인이란 제품의 형상·도안 또는 그 결합 및 색채와 형상·도안의 결합으로서 미감을 갖추고 공업적 적용이 가능한 새로운 설계를 말한다.",
        key: "발명 = 새로운 기술방안 / 실용신안 = 제품 형상·구조의 실용신안 / 디자인 = 미감 있는 새로운 설계",
        tips: ["발명과 실용신안의 차이: 방법 발명은 실용신안으로 보호 불가", "디자인은 반드시 공업적 적용 가능해야 함"],
      },
      {
        no: "제3조",
        title: "특허행정부문의 직책",
        cn: "专利行政部门的职责",
        content:
          "국무원 특허행정부문은 전국의 특허업무를 관리하며, 특허출원의 수리·심사를 책임지고 법에 따라 특허권을 수여한다. 성·자치구·직할시 인민정부의 특허업무관리부문은 본 행정구역 내의 특허업무를 관리한다.",
        key: "국가지식산권국(CNIPA)이 특허출원 수리 및 심사, 특허권 수여",
        tips: ["CNIPA: China National Intellectual Property Administration", "지방 특허관리부문은 관리 역할, 수여 역할은 없음"],
      },
      {
        no: "제6조",
        title: "직무발명과 비직무발명",
        cn: "职务发明创造和非职务发明创造",
        content:
          "직원이 본 단위의 임무를 수행하거나 주로 본 단위의 물질기술조건을 이용하여 완성한 발명은 직무발명이며, 특허출원권은 단위에 귀속된다. 직무발명을 제외한 발명은 비직무발명이며, 특허출원권은 발명자에게 귀속된다.",
        key: "직무발명: 출원권→단위 / 비직무발명: 출원권→발명자",
        tips: ["단위 물질기술조건을 '주로' 이용한 경우도 직무발명", "퇴직 후 1년 이내 관련 발명도 직무발명으로 볼 수 있음"],
      },
      {
        no: "제22조",
        title: "특허권 부여 조건",
        cn: "授予专利权的条件",
        content:
          "특허권을 부여하는 발명 및 실용신안은 반드시 신규성·창조성·실용성을 구비해야 한다. 신규성이란 해당 발명이 선행기술에 속하지 않고 어떤 단위 또는 개인도 동일 발명에 대해 출원일 이전에 국무원 특허행정부문에 출원하지 않은 것을 말한다.",
        key: "3대 요건: 신규성(新颖性) + 창조성(创造性) + 실용성(实用性)",
        tips: ["신규성: 절대적 신규성 기준 (세계 어디서도 공개 안 됨)", "창조성: 발명은 '현저한 실질적 특점+현저한 진보', 실용신안은 '실질적 특점+진보'"],
      },
    ],
  },
  {
    id: 2,
    title: "제2장 특허권의 귀속",
    subtitle: "专利权的归属",
    articles: [
      {
        no: "제8조",
        title: "공동발명",
        cn: "共同完成的发明创造",
        content: "두 단위 이상 또는 개인이 협력하여 완성한 발명, 혹은 한 단위 또는 개인이 다른 단위 또는 개인의 위탁을 받아 완성한 발명에 대한 특허출원권 및 특허권은 당사자의 협의에 의해 결정되며, 협의가 없으면 공동으로 완성한 단위 또는 개인이 출원권을 가진다.",
        key: "공동발명: 협의 우선 / 협의 없으면 공동 귀속",
        tips: ["위탁발명: 반드시 계약으로 출원권 귀속 명확히 해야 함", "계약 없으면 수탁자(실제 발명자)에게 귀속"],
      },
      {
        no: "제10조",
        title: "특허출원권 및 특허권의 양도",
        cn: "专利申请权和专利权的转让",
        content: "특허출원권 또는 특허권은 양도할 수 있다. 중국 단위 또는 개인이 외국인·외국기업 또는 외국 기타 조직에 특허출원권 또는 특허권을 양도하는 경우 관련 법률·행정법규를 준수해야 한다. 특허출원권 또는 특허권 양도는 서면 계약을 체결하고 국무원 특허행정부문에 등록해야 공시 효력이 발생한다.",
        key: "양도: 서면계약 필수 + 특허행정부문 등록 후 공시 효력 발생",
        tips: ["등록 전에는 제3자에 대항 불가", "외국인에게 양도 시 특별 규정 적용"],
      },
    ],
  },
  {
    id: 3,
    title: "제3장 특허 출원",
    subtitle: "专利的申请",
    articles: [
      {
        no: "제26조",
        title: "출원서류",
        cn: "申请文件",
        content: "발명 또는 실용신안 특허를 출원하는 경우 청구서·명세서·명세서 초록·청구범위를 제출해야 한다. 디자인 특허를 출원하는 경우 청구서·도면 또는 사진·간단한 설명을 제출해야 한다.",
        key: "발명/실용신안: 청구서+명세서+초록+청구범위 / 디자인: 청구서+도면/사진+간단한설명",
        tips: ["명세서: 발명의 내용을 명확하고 완전하게 공개해야 함 (공개충분원칙)", "청구범위: 명세서에 의해 뒷받침되어야 함"],
      },
      {
        no: "제28조",
        title: "출원일",
        cn: "申请日",
        content: "국무원 특허행정부문이 특허출원서류를 수령한 날을 출원일로 한다. 출원서류가 우편으로 발송된 경우 소인 날짜를 출원일로 한다.",
        key: "출원일 = 서류 수령일 (우편의 경우 소인 날짜)",
        tips: ["출원일은 특허심사 및 존속기간 산정의 기준", "우선일과 출원일 구분 필요"],
      },
      {
        no: "제29조",
        title: "우선권",
        cn: "优先权",
        content: "출원인이 외국에서 특허출원을 한 날로부터 12개월(발명·실용신안) 또는 6개월(디자인) 이내에 중국에서 동일 주제에 대해 특허출원을 하는 경우, 해당 국가와 중국이 체결한 협정 또는 공동 가입한 국제조약에 따라 우선권을 향유할 수 있다.",
        key: "우선권: 발명·실용신안 12개월 / 디자인 6개월",
        tips: ["파리협약 우선권이 가장 일반적", "국내우선권도 존재 (12개월 이내, 동일 출원인)"],
      },
    ],
  },
  {
    id: 4,
    title: "제4장 특허 심사·비준",
    subtitle: "专利的审查和批准",
    articles: [
      {
        no: "제34조",
        title: "초보심사 및 공개",
        cn: "初步审查和公布",
        content: "국무원 특허행정부문은 발명특허 출원을 수리한 후 초보심사를 거쳐 규정 요건에 부합하는 경우 출원일로부터 18개월이 되면 공개한다. 출원인의 신청이 있는 경우 조기 공개할 수 있다.",
        key: "발명특허: 출원일로부터 18개월 후 자동 공개 (조기공개 신청 가능)",
        tips: ["공개 후 임시보호 권리 발생", "실용신안·디자인은 공개 없이 바로 수권"],
      },
      {
        no: "제35조",
        title: "실질심사 청구",
        cn: "请求实质审查",
        content: "발명특허 출원에 대해 출원인은 출원일로부터 3년 이내에 언제든지 국무원 특허행정부문에 실질심사를 청구할 수 있다. 정당한 이유 없이 기간 내에 실질심사를 청구하지 않은 경우 해당 출원은 취하된 것으로 간주된다.",
        key: "실질심사 청구: 출원일로부터 3년 이내 (미청구 시 취하 간주)",
        tips: ["실질심사: 신규성·창조성·실용성 등 특허 요건 심사", "실용신안·디자인은 실질심사 없음 (초보심사만)"],
      },
    ],
  },
  {
    id: 5,
    title: "제5장 특허권의 지속기간·소멸·무효",
    subtitle: "专利权的期限、终止和无效",
    articles: [
      {
        no: "제42조",
        title: "특허권의 존속기간",
        cn: "专利权的期限",
        content: "발명특허권의 존속기간은 20년, 실용신안특허권의 존속기간은 10년, 디자인특허권의 존속기간은 15년이며, 모두 출원일로부터 계산한다.",
        key: "발명 20년 / 실용신안 10년 / 디자인 15년 (모두 출원일 기산)",
        tips: ["2021년 개정: 디자인 10년→15년으로 연장", "연장: 신약 특허는 최대 5년 연장 가능"],
      },
      {
        no: "제44조",
        title: "특허권의 소멸",
        cn: "专利权的终止",
        content: "다음 각 호의 경우 특허권은 기간 만료 전에 소멸한다: ①특허권자가 성문으로 특허권 포기 의사를 표시한 경우, ②특허권자가 규정에 따라 연차료를 납부하지 않은 경우. 특허권 소멸 후 해당 발명은 공중의 영역에 귀속된다.",
        key: "조기소멸: 서면 포기 또는 연차료 미납",
        tips: ["연차료 미납 후 6개월 이내에 회복 청구 가능", "소멸된 특허는 누구나 무상 사용 가능"],
      },
    ],
  },
];

const PRACTICE_TOPICS = [
  {
    id: "filing",
    title: "특허 출원 실무",
    cn: "专利申请实务",
    icon: "📋",
    content: [
      { step: "1. 선행기술 조사", desc: "CNIPA 특허 데이터베이스, esp@cenet, Google Patents 등을 활용하여 신규성·창조성 사전 검토", detail: "선행기술 조사는 출원 전 필수 단계로, 불필요한 출원 비용 절감 및 청구범위 설계에 활용됩니다." },
      { step: "2. 출원서류 작성", desc: "명세서(발명의 설명), 청구범위, 도면, 초록 등 작성", detail: "청구범위는 독립항과 종속항으로 구성하며, 독립항은 필수 기술 특징만 포함해야 합니다." },
      { step: "3. CNIPA 제출", desc: "온라인(特许业务办理系统) 또는 오프라인(각 수리처) 제출", detail: "출원료: 발명 900위안, 실용신안 500위안, 디자인 500위안 (2024년 기준)" },
      { step: "4. 초보심사 대응", desc: "방식 결함에 대한 보정 통지서 대응 (출원일로부터 ~3개월)", detail: "주요 방식 결함: 서식 오류, 서명 누락, 번역 오류 등. 기간 내 보정하지 않으면 취하 간주." },
      { step: "5. 실질심사 대응 (발명)", desc: "심사관 의견통지서(OA)에 대한 의견서 및 보정서 제출", detail: "보정은 원출원 범위를 초과할 수 없음. 일반적으로 2~3회 OA 대응 후 수권/거절 결정." },
    ],
  },
  {
    id: "claim",
    title: "청구범위 작성",
    cn: "权利要求书撰写",
    icon: "✍️",
    content: [
      { step: "독립항 작성 원칙", desc: "전제부(前序部分) + 特征部 구조 또는 전체 특징 서술", detail: "전제부: 발명의 주제 및 선행기술과 공통되는 특징 기재 / 특징부: 발명의 특유한 기술 특징 기재" },
      { step: "종속항 작성", desc: "인용하는 청구항 번호 + 추가 기술 특징 기재", detail: "종속항은 독립항 또는 다른 종속항을 인용할 수 있으며, 인용항의 모든 특징을 포함함." },
      { step: "청구범위 해석 원칙", desc: "명세서와 도면을 참조하여 청구범위 해석", detail: "중국: 중심한정주의보다는 주변한정주의에 가까우나 균등론 적용 가능. 청구범위가 보호 범위의 기준." },
      { step: "보정 시 주의사항", desc: "원출원 명세서 및 청구범위에 기재된 범위 내에서만 보정 가능", detail: "신규사항 추가 금지 원칙: 보정을 통해 원출원에 없던 내용을 추가할 수 없음." },
    ],
  },
  {
    id: "pct",
    title: "PCT 국제출원",
    cn: "PCT国际申请",
    icon: "🌏",
    content: [
      { step: "PCT 출원 개요", desc: "특허협력조약(Patent Cooperation Treaty)에 의한 국제출원 제도", detail: "하나의 PCT 출원으로 153개국 이상에서 동시 출원 효과. 우선일로부터 30개월(일부 국가 20개월)이내에 국내단계 진입." },
      { step: "수리관청 선택", desc: "CNIPA를 수리관청으로 하거나 WIPO 국제사무국에 직접 제출", detail: "중국 거주자는 원칙적으로 CNIPA를 통해 출원. 국가안전심사 관련 규정 준수 필요." },
      { step: "국제조사 및 예비심사", desc: "국제조사보고서(ISR) 및 국제예비심사보고서(IPER) 활용", detail: "ISR: 관련 선행기술 인용문헌 목록. IPER: 특허성 예비 판단. 비용 절감 전략으로 활용." },
      { step: "중국 국내단계 진입", desc: "우선일로부터 30개월 이내에 CNIPA에 국내단계 진입 신청", detail: "국내단계 진입 서류: 중국어 번역문, 수수료 납부, 출원인 정보 등. 기간 도과 시 권리 상실." },
    ],
  },
  {
    id: "enforcement",
    title: "특허권 집행",
    cn: "专利权执行",
    icon: "⚔️",
    content: [
      { step: "침해 분쟁 해결 경로", desc: "①협상 ②행정집법 (특허관리부문) ③사법구제 (인민법원)", detail: "행정루트: 신속하나 손해배상 청구 불가. 사법루트: 시간이 걸리나 손해배상 청구 가능." },
      { step: "침해판단 원칙", desc: "문의해석원칙 → 균등론 → 금반언원칙 순으로 적용", detail: "균등론: 특징이 실질적으로 동일한 방식으로 실질적으로 동일한 기능을 수행하여 실질적으로 동일한 효과를 달성하는 경우." },
      { step: "손해배상 산정", desc: "①특허권자 손실 ②침해자 이익 ③합리적 실시료 ④법정배상(최고 500만위안)", detail: "악의적 침해 시 손해액의 1~5배 징벌적 배상 가능 (2021년 개정 도입)." },
      { step: "무효심판 청구", desc: "특허복심위원회(현 특허국 복심및무효심리부)에 무효심판 청구", detail: "누구든지 언제나 무효심판 청구 가능. 무효 사유: 신규성·창조성 결여, 공개 불충분, 보정 초과 등." },
    ],
  },
];

const EXAM_SETS = [
  {
    id: 1,
    title: "모의시험 제1세트",
    year: "2014~2015년 기출 기반",
    questions: [
      {
        q: "다음 중 중국 특허법에서 규정하는 특허권을 부여받을 수 없는 발명에 해당하는 것은?",
        options: ["A. 유전자 재조합 기술로 생산된 인슐린", "B. 질병 진단 방법", "C. 새로운 화학 합성 방법", "D. 컴퓨터 프로그램과 결합된 기술방안"],
        answer: 1,
        explanation: "특허법 제25조에 따라 질병의 진단 및 치료 방법은 특허권을 받을 수 없습니다. 이는 의사의 치료 자유를 보호하기 위한 규정입니다. A는 제품 특허로 가능, C는 방법 특허로 가능, D는 기술방안이 있으면 특허 가능합니다.",
      },
      {
        q: "甲이 2020년 3월 1일 발명A에 대해 중국에 특허출원(출원번호 200000)을 하였다. 甲이 이 출원을 기초로 국내우선권을 주장하며 출원할 수 있는 마지막 날은?",
        options: ["A. 2020년 9월 1일", "B. 2021년 3월 1일", "C. 2021년 9월 1일", "D. 2022년 3월 1일"],
        answer: 1,
        explanation: "국내우선권은 최초 출원일로부터 12개월 이내에 주장할 수 있습니다(특허법 제29조). 2020년 3월 1일부터 12개월 후는 2021년 3월 1일입니다. 또한 선출원(200000)은 국내우선권 주장과 동시에 취하된 것으로 간주됩니다.",
      },
      {
        q: "특허권자 甲이 실시권자 乙에게 독점실시허가를 하였다. 이 경우 침해자 丙에 대해 소를 제기할 수 있는 자는?",
        options: ["A. 甲만 가능", "B. 乙만 가능", "C. 甲과 乙 모두 가능", "D. 甲과 乙 모두 불가"],
        answer: 2,
        explanation: "독점실시허가(独占许可)의 경우, 실시권자 乙은 특허권자 甲의 동의 없이도 독자적으로 침해소송을 제기할 수 있습니다. 특허권자 甲도 소송을 제기할 수 있습니다. 참고로 배타적실시허가(排他许可)에서는 乙이 단독으로 소 제기 가능하나 특허권자 甲도 소 제기 가능합니다.",
      },
      {
        q: "다음 중 선사용권(先用权)의 항변이 성립하기 위한 조건으로 옳지 않은 것은?",
        options: ["A. 특허 출원일 이전에 동일한 제품 제조 또는 동일한 방법을 사용하고 있을 것", "B. 원 범위 내에서만 계속 실시 가능", "C. 선사용권을 타인에게 양도하거나 상속 가능", "D. 해당 기술이 타인의 특허출원 이전에 이미 준비가 완료되었을 것"],
        answer: 2,
        explanation: "특허법 제75조에 따라 선사용권(先用权)은 해당 기업 또는 개인과 함께만 양도 또는 상속될 수 있으며, 단독으로는 양도·상속이 불가능합니다. 선사용권은 기업의 자산으로서 기업 전체 양도 시에만 함께 이전됩니다.",
      },
      {
        q: "발명특허 출원에 대한 실질심사 과정에서 심사관이 발행하는 거절결정에 불복하는 경우, 다음 중 옳은 절차는?",
        options: [
          "A. 거절결정을 받은 날로부터 3개월 이내에 특허복심위원회에 복심청구",
          "B. 거절결정을 받은 날로부터 3개월 이내에 법원에 행정소송",
          "C. 거절결정을 받은 날로부터 6개월 이내에 특허복심위원회에 복심청구",
          "D. 거절결정을 받은 날로부터 2개월 이내에 특허복심위원회에 복심청구",
        ],
        answer: 0,
        explanation: "특허법 제44조 및 특허법실시세칙에 따라 거절결정에 불복하는 경우, 거절결정통지서를 받은 날로부터 3개월 이내에 특허복심위원회(현재는 국가지식산권국 복심 및 무효심리부)에 복심을 청구할 수 있습니다.",
      },
    ],
  },
  {
    id: 2,
    title: "모의시험 제2세트",
    year: "2016~2017년 기출 기반",
    questions: [
      {
        q: "다음 발명 중 중국에서 특허권을 받을 수 있는 것은?",
        options: ["A. 동물 품종", "B. 식물 품종", "C. 미생물 자체", "D. 미생물을 이용한 발효 방법"],
        answer: 3,
        explanation: "특허법 제25조에 따라 동물 품종, 식물 품종은 특허권을 받을 수 없습니다(단, 식물 품종은 식물신품종보호조례로 보호). 미생물 자체는 자연에 존재하는 것이면 특허 불가이나, 미생물을 이용한 방법 발명은 특허를 받을 수 있습니다.",
      },
      {
        q: "甲회사(중국기업)는 乙(개인)에게 특허발명의 제조·판매 독점실시허가를 하면서 지역을 중국 전역으로 하고 실시료는 연간 50만위안으로 정하였다. 이 경우 甲이 자신의 특허를 직접 실시하려면?",
        options: ["A. 乙의 동의를 얻어야 한다", "B. 乙에게 별도 실시료를 지불해야 한다", "C. 甲은 자신의 특허이므로 자유롭게 실시 가능하다", "D. 계약에 별도 정함이 없으면 甲은 실시할 수 없다"],
        answer: 3,
        explanation: "독점실시허가(独占许可)에서는 실시권자만이 계약 범위 내에서 실시할 수 있으며, 특허권자도 동 범위에서는 실시가 제한됩니다. 따라서 계약에 별도 정함이 없으면 甲은 같은 범위에서 스스로 실시할 수 없습니다.",
      },
      {
        q: "다음 중 특허권 침해로 볼 수 없는 행위는?",
        options: [
          "A. 허가 없이 특허제품을 수입하는 행위",
          "B. 연구 목적으로 특허 방법을 사용하는 행위",
          "C. 특허제품임을 알면서 구매하여 판매하는 행위",
          "D. 특허제품을 생산하기 위해 부품을 공급하는 행위",
        ],
        answer: 1,
        explanation: "특허법 제75조에 따라 과학 연구 및 실험 목적으로만 관련 특허를 사용하는 경우는 특허권 침해에 해당하지 않습니다(과학연구 예외). 단, 상업적 목적이 있으면 이 예외가 적용되지 않습니다.",
      },
      {
        q: "PCT 국제출원에서 중국을 지정국으로 하는 경우, 국내단계 진입 기한은?",
        options: ["A. 우선일로부터 20개월", "B. 우선일로부터 22개월", "C. 우선일로부터 30개월", "D. 우선일로부터 31개월"],
        answer: 2,
        explanation: "중국은 PCT 제22조(1)항을 유보하였으므로 국내단계 진입 기한은 우선일로부터 30개월입니다. 일부 국가(예: 미국 등)는 30개월이지만, 예전에 20개월이었던 점을 혼동하지 않도록 주의해야 합니다.",
      },
      {
        q: "특허권이 수여된 후, 전리국(CNIPA)은 공보에 게재한다. 공보 게재 후 몇 개월 이내에 누구든지 무효심판을 청구할 수 있는가?",
        options: ["A. 공고일로부터 3개월 이내에만 가능", "B. 공고일로부터 6개월 이내에만 가능", "C. 특허권 존속기간 중 언제든지 가능", "D. 특허권 소멸 후에도 가능"],
        answer: 2,
        explanation: "중국 특허법에 따르면 특허권 수여 후에는 누구든지 언제든지(특허권 존속기간 중) 무효심판을 청구할 수 있습니다. 기간 제한이 없다는 점이 특징입니다. 단, 특허권이 소멸된 후에는 무효심판 청구의 실익이 없으나 법원 소송에서는 무효 항변이 가능합니다.",
      },
    ],
  },
  {
    id: 3,
    title: "모의시험 제3세트",
    year: "2018~2019년 기출 기반",
    questions: [
      {
        q: "甲이 2019년 6월 1일 발명A에 대해 중국에 우선 출원하고, 같은 해 11월 1일 이를 공개하였다. 이후 乙이 2020년 3월 1일 동일한 발명에 대해 특허출원을 한 경우, 乙의 출원에 대한 신규성 판단은?",
        options: [
          "A. 乙의 출원 전에 공개되었으므로 신규성 없음",
          "B. 甲의 출원 전에는 공개되지 않았으므로 신규성 있음",
          "C. 甲의 출원이 우선 출원이므로 선원주의에 의해 乙은 특허 불가",
          "D. A와 C 모두 해당",
        ],
        answer: 3,
        explanation: "두 가지 이유로 乙은 특허를 받을 수 없습니다. ①신규성: 甲이 2019년 11월 1일 공개하였으므로 乙의 출원일(2020년 3월 1일) 전에 이미 공개된 선행기술이 존재 → 신규성 없음. ②선원주의: 甲의 출원일(2019년 6월 1일)이 乙의 출원일보다 먼저이므로 동일 발명에 대해 乙은 특허 불가.",
      },
      {
        q: "특허법 제22조의 '실용성'에 관한 설명 중 틀린 것은?",
        options: [
          "A. 발명을 제조하거나 사용할 수 있고 적극적인 효과를 가져야 한다",
          "B. 인체를 수술 방법은 실용성이 없어 특허를 받을 수 없다",
          "C. 이론상으로만 가능하고 실제로 실시할 수 없는 발명은 실용성이 없다",
          "D. 사회적·경제적으로 유익해야 한다",
        ],
        answer: 1,
        explanation: "인체를 대상으로 한 수술 방법, 진단 방법은 특허법 제25조에 의해 특허를 받을 수 없습니다. 이는 '실용성' 부족이 아니라 특허를 받을 수 없는 주제(专利客体)에 해당하기 때문입니다. 실용성은 산업적으로 제조·사용 가능하고 적극적 효과를 가지는지를 기준으로 합니다.",
      },
      {
        q: "중국에서 발명특허의 출원부터 수권까지 걸리는 평균 심사기간은 대략 얼마인가?",
        options: ["A. 1년", "B. 2~3년", "C. 5년 이상", "D. 6개월"],
        answer: 1,
        explanation: "중국 발명특허의 평균 심사기간은 공개(출원 후 18개월)와 실질심사(청구 후 3년 이내) 과정을 거쳐 통상 2~3년이 소요됩니다. CNIPA의 심사 효율화 노력으로 최근에는 단축되는 추세이지만, 기술분야에 따라 차이가 있습니다.",
      },
      {
        q: "특허발명의 명세서에 기재된 실시예가 청구범위에 기재된 기술방안을 뒷받침하지 못하는 경우, 이는 어느 규정을 위반하는가?",
        options: ["A. 명확성 요건", "B. 지지요건 (명세서 지지 원칙)", "C. 단일성 요건", "D. 공개충분 원칙"],
        answer: 1,
        explanation: "지지요건(支持原则): 청구범위는 명세서에 의해 뒷받침되어야 합니다(특허법 제26조 제4항). 명세서에 기재되지 않은 내용이 청구범위에 포함되거나, 명세서의 실시예가 청구범위의 전체 범위를 뒷받침하지 못하면 이 요건을 위반합니다.",
      },
      {
        q: "다음 중 강제실시(强制许可)가 허용될 수 있는 경우가 아닌 것은?",
        options: [
          "A. 국가 비상사태 시 공중의 이익을 위해 필요한 경우",
          "B. 독점행위를 방지·제거하기 위해 필요한 경우",
          "C. 특허권자가 실시료를 과도하게 요구하는 경우",
          "D. 특허권 수여 후 3년, 출원 후 4년이 지났음에도 정당한 이유 없이 특허를 실시하지 않는 경우",
        ],
        answer: 2,
        explanation: "특허법 제48~52조에 따른 강제실시 사유: ①특허권자가 정당한 이유 없이 3년 이상 불실시, ②국가 비상사태 또는 공공 이익 필요, ③독점행위 방지. 실시료가 과도하다는 이유만으로는 강제실시 사유가 되지 않습니다. 단, 협상 결렬 후 CNIPA에 강제실시를 신청하면 CNIPA가 합리적 실시료를 결정할 수 있습니다.",
      },
    ],
  },
  {
    id: 4,
    title: "모의시험 제4세트",
    year: "2020~2021년 기출 기반",
    questions: [
      {
        q: "2021년 개정 특허법에서 새롭게 도입된 제도가 아닌 것은?",
        options: ["A. 디자인 특허 존속기간 15년으로 연장", "B. 징벌적 손해배상 제도", "C. 개방허가 제도", "D. 실질심사 청구기간 단축"],
        answer: 3,
        explanation: "2021년 개정 특허법의 주요 변경사항: ①디자인 존속기간 10년→15년 연장, ②징벌적 손해배상(1~5배) 도입, ③개방허가(Open License) 제도 신설, ④특허권 신뢰보호 원칙 강화, ⑤부분 디자인 보호 도입. 실질심사 청구기간(3년)은 변경되지 않았습니다.",
      },
      {
        q: "甲회사가 A특허를 보유하고, 乙회사가 A특허를 이용한 B특허를 보유한다. 乙이 B특허를 실시하려면 A특허를 침해하게 된다. 이 경우에 관한 설명 중 옳은 것은?",
        options: [
          "A. 乙은 甲의 동의 없이 B특허를 실시할 수 있다",
          "B. 甲은 乙의 동의 없이 B특허를 실시할 수 있다",
          "C. 乙이 甲에게 교차실시허가를 신청할 수 있고, 甲도 乙에게 교차허가를 받을 수 있다",
          "D. 乙은 CNIPA에 강제실시를 신청할 수 있으며, 甲은 이에 대해 별도 조건 없이 허가해야 한다",
        ],
        answer: 2,
        explanation: "종속특허 관계에서 乙은 甲의 허가 없이 B특허를 실시할 수 없으며, 甲은 B특허를 허가해주지 않을 수 있습니다. 다만, 乙이 CNIPA에 강제실시를 신청할 경우, 甲도 B특허에 대한 실시허가를 교차 요구할 수 있습니다(특허법 제51조). 이것이 교차실시허가(交叉许可) 원칙입니다.",
      },
      {
        q: "중국에서 비밀특허(涉密专利)에 관한 설명 중 틀린 것은?",
        options: [
          "A. 비밀특허는 공개되지 않는다",
          "B. 비밀특허는 CNIPA가 아닌 국가비밀기관이 관리한다",
          "C. 발명자나 출원인은 비밀특허를 외국에 출원할 수 없다",
          "D. 비밀특허권자도 손해배상 청구권을 행사할 수 있다",
        ],
        answer: 1,
        explanation: "비밀특허(涉密专利)는 국가 안보와 관련된 특허로, CNIPA가 관리합니다(국가비밀기관이 관리하지 않음). 비밀특허는 공개되지 않으며, 외국 출원은 엄격히 제한됩니다. 비밀특허도 특허권자의 권리를 보호받을 수 있으며 손해배상 청구도 가능합니다.",
      },
      {
        q: "특허 무효심판 청구에 관한 설명으로 옳지 않은 것은?",
        options: [
          "A. 특허권자도 자신의 특허에 대해 무효심판을 청구할 수 있다",
          "B. 무효심판 결정에 불복하는 경우 법원에 소를 제기할 수 있다",
          "C. 무효심판 중에는 특허권자가 청구범위를 제한하는 방향으로만 보정할 수 있다",
          "D. 발명특허의 일부 청구항에 대해서만 무효를 청구할 수 있다",
        ],
        answer: 0,
        explanation: "특허권자는 자신의 특허에 대해 무효심판을 청구할 수 없습니다. 무효심판은 이해관계인 또는 제3자가 청구하는 것으로, 특허권자는 스스로 무효를 구할 이익이 없으며, 권리를 포기하려면 별도의 포기 절차를 이용해야 합니다.",
      },
      {
        q: "다음 중 특허법상 '선행기술(现有技术)'에 해당하지 않는 것은?",
        options: [
          "A. 출원일 이전에 중국 내에서 출판된 논문",
          "B. 출원일 이전에 해외에서 공지된 기술",
          "C. 출원일 이전에 출원되었으나 출원일 이후에 공개된 타인의 특허출원",
          "D. 출원일 이전에 국제전시회에서 공개된 기술",
        ],
        answer: 2,
        explanation: "선행기술(现有技术)은 출원일 이전에 국내외에서 공지된 모든 기술을 포함합니다. 출원일 이전에 출원되었으나 출원일 이후에 공개된 타인의 특허출원은 '선행기술'이 아니라 '저촉출원(抵触申请)'으로, 신규성 판단에서만 사용되고 창조성 판단에는 사용되지 않습니다.",
      },
    ],
  },
  {
    id: 5,
    title: "모의시험 제5세트",
    year: "2022~2023년 기출 기반",
    questions: [
      {
        q: "외국인 또는 외국 기업이 중국에 특허를 출원하는 경우에 관한 설명 중 옳은 것은?",
        options: [
          "A. 외국인도 중국에서 직접 특허출원을 할 수 있으며 대리인이 필요하지 않다",
          "B. 중국에 주소나 영업소가 없는 외국인은 반드시 특허대리기구를 통해 출원해야 한다",
          "C. 외국인의 특허출원은 반드시 영어로 제출해야 한다",
          "D. 외국인은 PCT를 통해서만 중국에 특허출원을 할 수 있다",
        ],
        answer: 1,
        explanation: "특허법 제19조에 따라 중국에 상시 주소 또는 영업소가 없는 외국인, 외국 기업 및 외국 기타 조직이 중국에서 특허출원을 하거나 기타 특허 사무를 처리하려면 법에 의해 설립된 특허대리기구에 위탁해야 합니다. 또한 출원서류는 반드시 중국어로 제출해야 합니다.",
      },
      {
        q: "특허심사관의 거절결정에 대한 복심(复审)과 관련하여 옳은 설명은?",
        options: [
          "A. 복심 결정에 불복하면 CNIPA 원장에게 재심을 청구할 수 있다",
          "B. 복심 결정에 불복하면 3개월 이내에 인민법원에 행정소송을 제기할 수 있다",
          "C. 복심 청구는 특허권자만 할 수 있다",
          "D. 복심 결정은 취소 또는 유지만 가능하며 파기환송은 없다",
        ],
        answer: 1,
        explanation: "거절결정에 대한 복심 결정(유지 결정)에 불복하는 경우, 출원인은 복심 결정을 받은 날로부터 3개월 이내에 인민법원(베이징 지식재산법원)에 행정소송을 제기할 수 있습니다. 복심 청구는 출원인이 할 수 있으며, 복심위원회는 원결정 취소·유지 외에 심사부로의 환송도 가능합니다.",
      },
      {
        q: "다음 중 중국 특허법상 '개방허가(开放许可)' 제도에 관한 설명으로 옳지 않은 것은?",
        options: [
          "A. 특허권자가 CNIPA에 개방허가 신청을 하면 공보에 게재된다",
          "B. 개방허가 기간 중 특허권자는 해당 특허에 대한 독점실시허가 계약을 체결할 수 없다",
          "C. 개방허가 신청 후 취소도 가능하다",
          "D. 개방허가를 이용하는 실시권자는 CNIPA가 정한 연차료를 절감 받을 수 있다",
        ],
        answer: 3,
        explanation: "개방허가(开放许可) 제도(2021년 신설): 특허권자가 CNIPA에 개방허가를 신청하면 공보에 게재되고, 누구든지 신청하여 실시할 수 있습니다. 개방허가 기간 중 독점실시허가 계약 체결 불가, 취소 가능. 개방허가를 신청한 특허권자는 연차료를 절반으로 감면받습니다(실시권자가 아니라 특허권자가 연차료 감면 혜택).",
      },
      {
        q: "특허권자가 사망한 경우 특허권은 어떻게 처리되는가?",
        options: [
          "A. 즉시 공중 영역에 귀속된다",
          "B. CNIPA가 관리하게 된다",
          "C. 법정 상속인에게 상속된다",
          "D. 국가에 귀속된다",
        ],
        answer: 2,
        explanation: "특허권은 재산권의 일종으로 상속이 가능합니다. 특허권자가 사망하면 법정 상속 또는 유언에 따라 상속인에게 상속됩니다. 상속인이 없는 경우에는 유산으로 처리되며, 국가에 귀속되거나 관련 단체에 귀속될 수 있습니다.",
      },
      {
        q: "다음 중 특허권 침해에 대한 행정 집법과 사법 구제의 차이에 관한 설명으로 옳은 것은?",
        options: [
          "A. 행정집법에서는 손해배상을 받을 수 없다",
          "B. 사법구제는 행정집법보다 항상 신속하다",
          "C. 행정집법 결정에 불복해도 법원에 소송을 제기할 수 없다",
          "D. 사법구제에서는 침해금지 명령을 신청할 수 없다",
        ],
        answer: 0,
        explanation: "행정 집법 경로(특허관리부문 처리)에서는 침해 중지 명령과 과태료 등 행정처벌은 가능하지만, 손해배상은 청구할 수 없습니다. 손해배상은 반드시 인민법원에 민사소송을 제기해야 합니다. 행정집법 결정에 불복하면 법원에 행정소송을 제기할 수 있습니다.",
      },
    ],
  },
];

export default function App() {
  const [page, setPage] = useState("home");
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedPractice, setSelectedPractice] = useState(null);
  const [selectedExamSet, setSelectedExamSet] = useState(null);
  const [examState, setExamState] = useState({ answers: {}, submitted: false });
  const [currentQ, setCurrentQ] = useState(0);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [aiQuestion, setAiQuestion] = useState("");
  const aiInputRef = useRef(null);

  const startExam = (set) => {
    setSelectedExamSet(set);
    setExamState({ answers: {}, submitted: false });
    setCurrentQ(0);
    setPage("exam");
  };

  const selectAnswer = (qi, ai) => {
    if (examState.submitted) return;
    setExamState((prev) => ({ ...prev, answers: { ...prev.answers, [qi]: ai } }));
  };

  const submitExam = () => {
    setExamState((prev) => ({ ...prev, submitted: true }));
  };

  const calcScore = () => {
    if (!selectedExamSet) return 0;
    let correct = 0;
    selectedExamSet.questions.forEach((q, i) => {
      if (examState.answers[i] === q.answer) correct++;
    });
    return correct;
  };

  const askAI = async () => {
    const q = aiInputRef.current?.value?.trim();
    if (!q || aiLoading) return;
    setAiLoading(true);
    setAiQuestion(q);
    setAiResponse("");
    aiInputRef.current.value = "";
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: "당신은 중국 변리사 자격증 시험 전문 강사입니다. 중국 특허법 및 관련 법규에 대한 질문에 정확하고 상세하게 답변해 주세요. 답변은 한국어로 해주세요. 관련 조문, 판례, 시험 포인트를 포함해 주세요.",
          messages: [{ role: "user", content: q }],
        }),
      });
      const data = await res.json();
      setAiResponse(data.content?.[0]?.text || "답변을 가져올 수 없습니다.");
    } catch {
      setAiResponse("오류가 발생했습니다. 다시 시도해 주세요.");
    }
    setAiLoading(false);
  };

  const styles = {
    wrap: { fontFamily: "'Noto Serif KR', 'Source Han Serif', Georgia, serif", background: COLORS.bg, minHeight: "100vh", color: COLORS.text },
    header: { background: COLORS.primary, color: "#fff", padding: "0 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, boxShadow: "0 2px 12px rgba(0,0,0,0.18)" },
    logo: { fontSize: 20, fontWeight: 700, letterSpacing: 2, color: "#fff", fontFamily: "'Noto Serif KR', serif" },
    logoSub: { fontSize: 11, color: COLORS.accent, letterSpacing: 1, marginTop: 2, fontFamily: "sans-serif", fontWeight: 400 },
    nav: { display: "flex", gap: 4 },
    navBtn: (active) => ({ background: active ? COLORS.accent : "transparent", color: active ? "#fff" : "rgba(255,255,255,0.8)", border: "none", borderRadius: 6, padding: "8px 16px", cursor: "pointer", fontSize: 13, fontWeight: active ? 600 : 400, transition: "all .2s", fontFamily: "sans-serif" }),
    main: { maxWidth: 960, margin: "0 auto", padding: "2rem 1.5rem" },
    hero: { background: `linear-gradient(135deg, ${COLORS.primary} 0%, #0d2444 100%)`, borderRadius: 16, color: "#fff", padding: "3rem 2.5rem", marginBottom: 24, position: "relative", overflow: "hidden" },
    heroTitle: { fontSize: 28, fontWeight: 700, marginBottom: 8, letterSpacing: 1 },
    heroSub: { fontSize: 15, color: "rgba(255,255,255,0.75)", marginBottom: 28, lineHeight: 1.7 },
    badge: { display: "inline-block", background: COLORS.accent, color: "#fff", borderRadius: 4, padding: "3px 10px", fontSize: 11, fontWeight: 600, marginRight: 8, fontFamily: "sans-serif" },
    grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 24 },
    card: { background: COLORS.card, borderRadius: 12, border: `1px solid ${COLORS.border}`, padding: "1.25rem 1.5rem", cursor: "pointer", transition: "all .2s", position: "relative" },
    cardHover: { boxShadow: "0 4px 20px rgba(26,58,107,0.12)", transform: "translateY(-2px)" },
    cardTitle: { fontSize: 15, fontWeight: 600, marginBottom: 4, color: COLORS.primary },
    cardSub: { fontSize: 12, color: COLORS.muted, fontFamily: "sans-serif" },
    sectionTitle: { fontSize: 20, fontWeight: 700, color: COLORS.primary, marginBottom: 16, borderLeft: `4px solid ${COLORS.accent}`, paddingLeft: 12, fontFamily: "'Noto Serif KR', serif" },
    back: { background: "none", border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: "6px 14px", cursor: "pointer", fontSize: 13, color: COLORS.muted, marginBottom: 20, fontFamily: "sans-serif" },
    articleCard: { background: COLORS.card, borderRadius: 12, border: `1px solid ${COLORS.border}`, padding: "1.5rem", marginBottom: 16 },
    articleNo: { fontSize: 12, color: COLORS.accent, fontWeight: 700, fontFamily: "sans-serif", marginBottom: 6 },
    articleTitle: { fontSize: 17, fontWeight: 700, color: COLORS.primary, marginBottom: 4 },
    articleCn: { fontSize: 13, color: COLORS.muted, marginBottom: 12, fontStyle: "italic" },
    content: { fontSize: 14, lineHeight: 1.9, color: COLORS.text, marginBottom: 16, background: COLORS.bg, borderRadius: 8, padding: "1rem 1.25rem", borderLeft: `3px solid ${COLORS.accent}` },
    keyBox: { background: "#EAF0FB", borderRadius: 8, padding: "0.75rem 1rem", fontSize: 13, color: COLORS.primary, fontWeight: 600, marginBottom: 12, fontFamily: "sans-serif" },
    tipsList: { fontSize: 13, color: COLORS.muted, paddingLeft: 20, lineHeight: 2, fontFamily: "sans-serif" },
    qCard: { background: COLORS.card, borderRadius: 12, border: `1px solid ${COLORS.border}`, padding: "1.75rem", marginBottom: 16 },
    qNum: { fontSize: 12, color: COLORS.accent, fontWeight: 700, fontFamily: "sans-serif", marginBottom: 8 },
    qText: { fontSize: 15, fontWeight: 600, color: COLORS.text, marginBottom: 16, lineHeight: 1.7 },
    optionBtn: (sel, correct, submitted, idx, ans) => {
      let bg = COLORS.bg, border = COLORS.border, color = COLORS.text;
      if (submitted) {
        if (idx === ans) { bg = "#d4edda"; border = COLORS.success; color = COLORS.success; }
        else if (idx === sel && idx !== ans) { bg = "#f8d7da"; border = COLORS.danger; color = COLORS.danger; }
      } else if (idx === sel) { bg = COLORS.highlight; border = COLORS.primary; color = COLORS.primary; }
      return { display: "block", width: "100%", textAlign: "left", background: bg, border: `1.5px solid ${border}`, borderRadius: 8, padding: "10px 14px", marginBottom: 8, cursor: submitted ? "default" : "pointer", fontSize: 14, color, transition: "all .15s", fontFamily: "sans-serif" };
    },
    explanation: { background: "#EAF0FB", borderRadius: 8, padding: "1rem 1.25rem", fontSize: 13, color: "#1A3A6B", lineHeight: 1.8, marginTop: 12, fontFamily: "sans-serif" },
    progressBar: { height: 6, background: COLORS.border, borderRadius: 3, marginBottom: 20 },
    progressFill: (p) => ({ height: "100%", width: `${p}%`, background: COLORS.accent, borderRadius: 3, transition: "width .3s" }),
    aiBox: { background: COLORS.card, borderRadius: 12, border: `1px solid ${COLORS.border}`, padding: "1.5rem", marginTop: 24 },
    aiTitle: { fontSize: 15, fontWeight: 700, color: COLORS.primary, marginBottom: 12, fontFamily: "sans-serif" },
    aiInput: { width: "100%", border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "10px 14px", fontSize: 14, marginBottom: 10, fontFamily: "sans-serif", boxSizing: "border-box", outline: "none" },
    aiBtn: { background: COLORS.primary, color: "#fff", border: "none", borderRadius: 8, padding: "9px 22px", fontSize: 14, cursor: "pointer", fontFamily: "sans-serif", fontWeight: 600 },
    aiResponse: { background: COLORS.bg, borderRadius: 8, padding: "1rem 1.25rem", fontSize: 13, lineHeight: 1.85, color: COLORS.text, marginTop: 12, fontFamily: "sans-serif", whiteSpace: "pre-wrap" },
    scoreBox: { background: `linear-gradient(135deg, ${COLORS.primary}, #2a5298)`, color: "#fff", borderRadius: 12, padding: "2rem", textAlign: "center", marginBottom: 20 },
    practiceStep: { background: COLORS.bg, borderRadius: 8, padding: "1rem 1.25rem", marginBottom: 12, borderLeft: `3px solid ${COLORS.primary}` },
    practiceStepTitle: { fontSize: 14, fontWeight: 700, color: COLORS.primary, marginBottom: 6, fontFamily: "sans-serif" },
    practiceDesc: { fontSize: 13, color: COLORS.text, marginBottom: 6, fontFamily: "sans-serif" },
    practiceDetail: { fontSize: 12, color: COLORS.muted, lineHeight: 1.7, fontFamily: "sans-serif" },
  };

  const [hovered, setHovered] = useState(null);

  const renderHome = () => (
    <div>
      <div style={styles.hero}>
        <div style={{ position: "absolute", right: 40, top: 30, opacity: 0.08, fontSize: 120, fontFamily: "serif" }}>专</div>
        <div style={styles.heroTitle}>중국 변리사 자격증 시험 완전 정복</div>
        <div style={styles.heroSub}>专利代理师资格考试 완벽 대비<br />특허법 학습 · 실무 가이드 · 기출 모의시험 5세트</div>
        <span style={styles.badge}>특허법</span>
        <span style={styles.badge}>실무 가이드</span>
        <span style={styles.badge}>모의시험 5세트</span>
      </div>
      <div style={styles.sectionTitle}>학습 메뉴</div>
      <div style={styles.grid}>
        {[
          { id: "law", icon: "📚", title: "특허법 학습", desc: "주요 조문 해설 및 핵심 포인트", sub: `${LAW_CHAPTERS.length}개 챕터` },
          { id: "practice", icon: "⚖️", title: "실무 가이드", desc: "출원·청구범위·PCT·집행 실무", sub: `${PRACTICE_TOPICS.length}개 주제` },
          { id: "exam", icon: "📝", title: "모의시험", desc: "10년치 기출 기반 5세트", sub: "각 5문제" },
        ].map((m) => (
          <div key={m.id} style={{ ...styles.card, ...(hovered === m.id ? styles.cardHover : {}) }} onMouseEnter={() => setHovered(m.id)} onMouseLeave={() => setHovered(null)} onClick={() => setPage(m.id)}>
            <div style={{ fontSize: 32, marginBottom: 10 }}>{m.icon}</div>
            <div style={styles.cardTitle}>{m.title}</div>
            <div style={styles.cardSub}>{m.desc}</div>
            <div style={{ marginTop: 8, fontSize: 11, color: COLORS.accent, fontFamily: "sans-serif", fontWeight: 600 }}>{m.sub}</div>
          </div>
        ))}
      </div>
      <div style={styles.sectionTitle}>AI 질의응답</div>
      <div style={styles.aiBox}>
        <div style={styles.aiTitle}>🤖 특허법 AI 질의응답</div>
        <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 12, fontFamily: "sans-serif" }}>특허법, 시험 문제, 실무에 대해 무엇이든 질문하세요.</div>
        <input ref={aiInputRef} style={styles.aiInput} placeholder="예: 직무발명과 비직무발명의 차이점은 무엇인가요?" onKeyDown={(e) => e.key === "Enter" && askAI()} />
        <button style={styles.aiBtn} onClick={askAI} disabled={aiLoading}>{aiLoading ? "답변 중..." : "질문하기 →"}</button>
        {aiQuestion && <div style={{ fontSize: 13, color: COLORS.primary, fontWeight: 600, marginTop: 14, fontFamily: "sans-serif" }}>Q: {aiQuestion}</div>}
        {aiLoading && <div style={{ ...styles.aiResponse, color: COLORS.muted }}>AI가 답변을 생성 중입니다...</div>}
        {aiResponse && <div style={styles.aiResponse}>{aiResponse}</div>}
      </div>
    </div>
  );

  const renderLaw = () => {
    if (selectedArticle && selectedChapter) {
      const a = selectedArticle;
      return (
        <div>
          <button style={styles.back} onClick={() => setSelectedArticle(null)}>← 목록으로</button>
          <div style={styles.articleCard}>
            <div style={styles.articleNo}>{a.no}</div>
            <div style={styles.articleTitle}>{a.title}</div>
            <div style={styles.articleCn}>{a.cn}</div>
            <div style={styles.content}>{a.content}</div>
            <div style={styles.keyBox}>🔑 핵심 포인트: {a.key}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.primary, marginBottom: 8, fontFamily: "sans-serif" }}>✅ 시험 팁</div>
            <ul style={styles.tipsList}>{a.tips.map((t, i) => <li key={i}>{t}</li>)}</ul>
          </div>
          <div style={styles.aiBox}>
            <div style={styles.aiTitle}>🤖 이 조문에 대해 더 알고 싶으신가요?</div>
            <input ref={aiInputRef} style={styles.aiInput} placeholder={`${a.no} 관련 질문을 입력하세요...`} onKeyDown={(e) => e.key === "Enter" && askAI()} />
            <button style={styles.aiBtn} onClick={askAI} disabled={aiLoading}>{aiLoading ? "답변 중..." : "질문하기 →"}</button>
            {aiQuestion && <div style={{ fontSize: 13, color: COLORS.primary, fontWeight: 600, marginTop: 14, fontFamily: "sans-serif" }}>Q: {aiQuestion}</div>}
            {aiLoading && <div style={{ ...styles.aiResponse, color: COLORS.muted }}>답변 생성 중...</div>}
            {aiResponse && <div style={styles.aiResponse}>{aiResponse}</div>}
          </div>
        </div>
      );
    }
    if (selectedChapter) {
      return (
        <div>
          <button style={styles.back} onClick={() => setSelectedChapter(null)}>← 챕터 목록</button>
          <div style={styles.sectionTitle}>{selectedChapter.title}</div>
          <div style={{ fontSize: 13, color: COLORS.muted, marginBottom: 16, fontFamily: "sans-serif" }}>{selectedChapter.subtitle}</div>
          {selectedChapter.articles.map((a, i) => (
            <div key={i} style={{ ...styles.card, marginBottom: 12 }} onClick={() => setSelectedArticle(a)}>
              <div style={styles.articleNo}>{a.no}</div>
              <div style={styles.cardTitle}>{a.title}</div>
              <div style={styles.cardSub}>{a.cn}</div>
            </div>
          ))}
        </div>
      );
    }
    return (
      <div>
        <div style={styles.sectionTitle}>특허법 학습</div>
        <div style={{ fontSize: 13, color: COLORS.muted, marginBottom: 20, fontFamily: "sans-serif" }}>챕터를 선택하여 주요 조문을 학습하세요.</div>
        {LAW_CHAPTERS.map((ch) => (
          <div key={ch.id} style={{ ...styles.card, marginBottom: 12, ...(hovered === ch.id ? styles.cardHover : {}) }} onMouseEnter={() => setHovered(ch.id)} onMouseLeave={() => setHovered(null)} onClick={() => setSelectedChapter(ch)}>
            <div style={styles.cardTitle}>{ch.title}</div>
            <div style={styles.cardSub}>{ch.subtitle} · {ch.articles.length}개 조문</div>
          </div>
        ))}
      </div>
    );
  };

  const renderPractice = () => {
    if (selectedPractice) {
      const p = selectedPractice;
      return (
        <div>
          <button style={styles.back} onClick={() => setSelectedPractice(null)}>← 목록으로</button>
          <div style={styles.sectionTitle}>{p.icon} {p.title}</div>
          <div style={{ fontSize: 13, color: COLORS.muted, marginBottom: 20, fontFamily: "sans-serif" }}>{p.cn}</div>
          {p.content.map((s, i) => (
            <div key={i} style={styles.practiceStep}>
              <div style={styles.practiceStepTitle}>{s.step}</div>
              <div style={styles.practiceDesc}>{s.desc}</div>
              <div style={styles.practiceDetail}>{s.detail}</div>
            </div>
          ))}
          <div style={styles.aiBox}>
            <div style={styles.aiTitle}>🤖 실무 관련 AI 질문</div>
            <input ref={aiInputRef} style={styles.aiInput} placeholder={`${p.title}에 대해 질문하세요...`} onKeyDown={(e) => e.key === "Enter" && askAI()} />
            <button style={styles.aiBtn} onClick={askAI} disabled={aiLoading}>{aiLoading ? "답변 중..." : "질문하기 →"}</button>
            {aiQuestion && <div style={{ fontSize: 13, color: COLORS.primary, fontWeight: 600, marginTop: 14, fontFamily: "sans-serif" }}>Q: {aiQuestion}</div>}
            {aiLoading && <div style={{ ...styles.aiResponse, color: COLORS.muted }}>답변 생성 중...</div>}
            {aiResponse && <div style={styles.aiResponse}>{aiResponse}</div>}
          </div>
        </div>
      );
    }
    return (
      <div>
        <div style={styles.sectionTitle}>특허 실무 가이드</div>
        <div style={{ fontSize: 13, color: COLORS.muted, marginBottom: 20, fontFamily: "sans-serif" }}>실무 주제를 선택하여 상세 내용을 확인하세요.</div>
        <div style={styles.grid}>
          {PRACTICE_TOPICS.map((p) => (
            <div key={p.id} style={{ ...styles.card, ...(hovered === p.id ? styles.cardHover : {}) }} onMouseEnter={() => setHovered(p.id)} onMouseLeave={() => setHovered(null)} onClick={() => setSelectedPractice(p)}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{p.icon}</div>
              <div style={styles.cardTitle}>{p.title}</div>
              <div style={styles.cardSub}>{p.cn}</div>
              <div style={{ marginTop: 8, fontSize: 11, color: COLORS.accent, fontFamily: "sans-serif", fontWeight: 600 }}>{p.content.length}개 단계</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderExam = () => {
    if (selectedExamSet) {
      const qs = selectedExamSet.questions;
      const score = calcScore();
      const total = qs.length;
      const progress = examState.submitted ? 100 : (Object.keys(examState.answers).length / total) * 100;
      return (
        <div>
          <button style={styles.back} onClick={() => { setSelectedExamSet(null); setExamState({ answers: {}, submitted: false }); setCurrentQ(0); }}>← 시험 목록</button>
          <div style={styles.sectionTitle}>{selectedExamSet.title}</div>
          <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 16, fontFamily: "sans-serif" }}>{selectedExamSet.year}</div>
          <div style={styles.progressBar}><div style={styles.progressFill(progress)} /></div>
          {examState.submitted && (
            <div style={styles.scoreBox}>
              <div style={{ fontSize: 36, fontWeight: 700, marginBottom: 8 }}>{score} / {total}</div>
              <div style={{ fontSize: 15, opacity: 0.85 }}>{score >= 4 ? "🎉 우수한 성적입니다!" : score >= 3 ? "👍 합격권입니다!" : "📖 더 복습이 필요합니다."}</div>
            </div>
          )}
          {qs.map((q, qi) => (
            <div key={qi} style={styles.qCard}>
              <div style={styles.qNum}>문제 {qi + 1}</div>
              <div style={styles.qText}>{q.q}</div>
              {q.options.map((opt, ai) => (
                <button key={ai} style={styles.optionBtn(examState.answers[qi], qi === q.answer, examState.submitted, ai, q.answer)} onClick={() => selectAnswer(qi, ai)}>
                  {opt}
                  {examState.submitted && ai === q.answer && " ✓"}
                  {examState.submitted && ai === examState.answers[qi] && ai !== q.answer && " ✗"}
                </button>
              ))}
              {examState.submitted && <div style={styles.explanation}>💡 해설: {q.explanation}</div>}
            </div>
          ))}
          {!examState.submitted && (
            <button style={{ ...styles.aiBtn, width: "100%", padding: "14px", fontSize: 15 }} onClick={submitExam} disabled={Object.keys(examState.answers).length < total}>
              {Object.keys(examState.answers).length < total ? `${total - Object.keys(examState.answers).length}문제 더 풀어야 제출 가능` : "답안 제출하기"}
            </button>
          )}
        </div>
      );
    }
    return (
      <div>
        <div style={styles.sectionTitle}>모의시험</div>
        <div style={{ fontSize: 13, color: COLORS.muted, marginBottom: 20, fontFamily: "sans-serif" }}>10년치 기출문제를 기반으로 구성된 5세트 모의시험입니다.</div>
        <div style={{ display: "grid", gap: 14 }}>
          {EXAM_SETS.map((set) => (
            <div key={set.id} style={{ ...styles.card, display: "flex", alignItems: "center", justifyContent: "space-between", ...(hovered === set.id ? styles.cardHover : {}) }} onMouseEnter={() => setHovered(set.id)} onMouseLeave={() => setHovered(null)}>
              <div>
                <div style={styles.cardTitle}>{set.title}</div>
                <div style={styles.cardSub}>{set.year} · {set.questions.length}문제</div>
              </div>
              <button style={{ ...styles.aiBtn, padding: "8px 20px" }} onClick={() => startExam(set)}>시험 시작</button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div style={styles.wrap}>
      <div style={styles.header}>
        <div>
          <div style={styles.logo}>中国专利代理师 학습관</div>
          <div style={styles.logoSub}>중국 변리사 자격증 시험 준비 플랫폼</div>
        </div>
        <nav style={styles.nav}>
          {NAV_ITEMS.map((n) => (
            <button key={n.id} style={styles.navBtn(page === n.id)} onClick={() => { setPage(n.id); setSelectedChapter(null); setSelectedArticle(null); setSelectedPractice(null); setSelectedExamSet(null); }}>
              {n.icon} {n.label}
            </button>
          ))}
        </nav>
      </div>
      <div style={styles.main}>
        {page === "home" && renderHome()}
        {page === "law" && renderLaw()}
        {page === "practice" && renderPractice()}
        {page === "exam" && renderExam()}
      </div>
    </div>
  );
}
