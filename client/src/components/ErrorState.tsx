export default function ErrorState({ text }: { text: string }) {
  return (
    <div className="p-4 text-red-500 bg-red-50 rounded">
      {text}
    </div>
  );
}
