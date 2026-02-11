"use client";

import { Mail, Lock, Users, Home, Clock, Shield } from "lucide-react";
import { FamilyIcon } from "./FamilyIcon";

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <FamilyIcon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            FamDiaryLog
          </h1>
          <p className="text-gray-600 text-xs">家族でつながる、毎日の記録</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Left: Features */}
          <div className="space-y-4 flex flex-col">
            <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-6 border border-indigo-100 flex-1">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    家族限定の安心空間
                  </h3>
                  <p className="text-sm text-gray-600">
                    クローズドな環境で、家族だけの思い出を安全に共有できます
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-6 border border-purple-100 flex-1">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    毎日の記録を習慣に
                  </h3>
                  <p className="text-sm text-gray-600">
                    簡単な投稿で日々の出来事を記録。振り返りも楽しくなります
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-6 border border-pink-100 flex-1">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    プライバシー保護
                  </h3>
                  <p className="text-sm text-gray-600">
                    外部に公開されない、家族だけのプライベートな日記帳です
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Login */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 flex flex-col justify-between">
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  はじめましょう
                </h2>
                {/* <p className="text-gray-600">
                  家族の大切な思い出を記録して共有しましょう
                </p> */}
              </div>

              <div className="space-y-4">
                <button
                  type="button"
                  onClick={onLogin}
                  className="w-full flex items-center justify-center gap-3 py-4 px-4 bg-white border-2 border-gray-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200 shadow-sm hover:shadow-md group"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span className="font-medium text-gray-700 group-hover:text-gray-900">
                    Googleでログイン
                  </span>
                </button>

                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">!</span>
                    </div>
                    <div className="text-sm text-gray-700">
                      初めての方も、Googleアカウントで簡単にログインできます。
                      家族を招待して、みんなで楽しく記録を始めましょう。
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <p className="text-xs text-gray-500 text-center">
                ログインすることで、
                <a href="#" className="text-indigo-600 hover:underline">
                  利用規約
                </a>
                および
                <a href="#" className="text-indigo-600 hover:underline">
                  プライバシーポリシー
                </a>
                に同意したものとみなされます
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
