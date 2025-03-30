import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { AlertCircle, Save, Image, Check, BarChart3, PanelLeft, Palette, Layout, Type, Users, MessageSquare, ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const SiteEditor: React.FC = () => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("hero");
  const [showPreview, setShowPreview] = useState(false);

  // Mock data for the site content
  const [siteContent, setSiteContent] = useState({
    hero: {
      title: "Sistema de Gestão Tributária para Escritórios de Advocacia",
      subtitle: "Soluções completas para empresas que precisam de excelência em consultoria fiscal e recuperação de impostos.",
      ctaText: "Acessar Sistema"
    },
    benefits: {
      title: "Benefícios Principais",
      subtitle: "Nossa plataforma foi desenvolvida para otimizar processos e maximizar resultados.",
      items: [
        {
          title: "Aumento de Produtividade",
          description: "Processos automatizados que economizam tempo e reduzem erros operacionais."
        },
        {
          title: "Conformidade Fiscal",
          description: "Garanta que sua empresa esteja sempre em dia com as obrigações fiscais."
        },
        {
          title: "Economia de Tempo",
          description: "Reduza drasticamente o tempo gasto em tarefas manuais e repetitivas."
        }
      ]
    },
    features: {
      title: "Funcionalidades Principais",
      subtitle: "Conheça as ferramentas que irão transformar a gestão tributária da sua empresa.",
      items: [
        {
          title: "Auditoria Tributária",
          description: "Análise completa da situação fiscal da sua empresa para identificar oportunidades de economia."
        },
        {
          title: "Cálculos Fiscais",
          description: "Ferramentas precisas para calcular impostos e identificar créditos tributários."
        }
      ]
    },
    testimonials: {
      title: "O Que Dizem Nossos Clientes",
      subtitle: "Depoimentos de quem já experimentou nossa solução e transformou sua gestão tributária.",
      items: [
        {
          name: "Maria Silva",
          role: "Diretora Financeira",
          company: "Tech Solutions Ltda",
          content: "O sistema de gestão tributária transformou completamente nossa maneira de gerenciar impostos. Economizamos tempo e recursos significativos."
        }
      ]
    },
    cta: {
      title: "Pronto para Otimizar sua Gestão Tributária?",
      subtitle: "Agende uma demonstração com nossa equipe e descubra como podemos ajudar seu escritório a maximizar resultados.",
      buttonText: "Comece Agora"
    },
    footer: {
      developerName: "Alex Developer",
      developerUrl: "https://alexdesenvolvedor.com.br",
      socialLinks: [
        { platform: "Facebook", url: "#" },
        { platform: "Twitter", url: "#" },
        { platform: "Instagram", url: "#" },
        { platform: "GitHub", url: "#" }
      ]
    }
  });

  // Animation variants for the cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  // Simulating initial loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      toast({
        title: "Dados carregados",
        description: "As informações do site foram carregadas com sucesso.",
        duration: 3000
      });
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [toast]);

  const handleSave = () => {
    setSaving(true);
    
    // Simulate saving to the backend
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Conteúdo salvo",
        description: "As alterações foram salvas com sucesso.",
        variant: "default"
      });
    }, 1000);
  };

  const handleHeroChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSiteContent({
      ...siteContent,
      hero: {
        ...siteContent.hero,
        [name]: value
      }
    });
  };

  const handleBenefitChange = (index: number, field: string, value: string) => {
    const updatedBenefits = [...siteContent.benefits.items];
    updatedBenefits[index] = {
      ...updatedBenefits[index],
      [field]: value
    };
    
    setSiteContent({
      ...siteContent,
      benefits: {
        ...siteContent.benefits,
        items: updatedBenefits
      }
    });
  };

  const handleTestimonialChange = (index: number, field: string, value: string) => {
    const updatedTestimonials = [...siteContent.testimonials.items];
    updatedTestimonials[index] = {
      ...updatedTestimonials[index],
      [field]: value
    };
    
    setSiteContent({
      ...siteContent,
      testimonials: {
        ...siteContent.testimonials,
        items: updatedTestimonials
      }
    });
  };

  // Color theme options for the admin dashboard
  const colorThemes = [
    { name: "Padrão", primary: "#333333", accent: "#4D4D4D" },
    { name: "Azul", primary: "#1a73e8", accent: "#4285f4" },
    { name: "Verde", primary: "#0f9d58", accent: "#34a853" },
    { name: "Roxo", primary: "#673ab7", accent: "#9c27b0" }
  ];

  return (
    <div className="container mx-auto p-4 md:p-6 animate-fade-in">
      {/* Dashboard Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-lawyer-800 to-lawyer-700 rounded-xl shadow-lg p-6 mb-6 text-white"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center">
              <Palette className="mr-2 h-7 w-7" />
              Editor de Site
            </h1>
            <p className="text-lawyer-100 mt-1">
              Personalize a aparência e conteúdo do seu site com nosso editor intuitivo
            </p>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="border-white/20 text-white hover:bg-white/10 hover:text-white"
              onClick={() => setShowPreview(!showPreview)}
            >
              <Layout className="mr-2 h-4 w-4" />
              {showPreview ? "Ocultar Preview" : "Visualizar"}
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={saving}
              className="bg-white text-lawyer-800 hover:bg-white/90 transition-all"
            >
              {saving ? (
                <>Salvando...</>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Alterações
                </>
              )}
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          {colorThemes.map((theme, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="cursor-pointer bg-white/10 rounded-lg p-3 hover:bg-white/20 transition-colors"
            >
              <div className="flex items-center gap-2">
                <div 
                  className="w-6 h-6 rounded-full" 
                  style={{ background: theme.primary }}
                />
                <span>{theme.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar - Stats */}
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="col-span-1 lg:col-span-3"
        >
          <Card className="bg-white shadow-md border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <BarChart3 className="mr-2 h-5 w-5 text-lawyer-700" />
                Estatísticas do Site
              </CardTitle>
            </CardHeader>
            <CardContent>
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                {[
                  { label: "Páginas", value: "8" },
                  { label: "Elementos", value: "24" },
                  { label: "Imagens", value: "12" },
                  { label: "Visitantes/Mês", value: "1.2k" }
                ].map((stat, index) => (
                  <motion.div 
                    key={index}
                    variants={itemVariants}
                    className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-colors"
                  >
                    <span className="text-lawyer-600 font-medium">{stat.label}</span>
                    <Badge variant="secondary" className="bg-lawyer-700 text-white hover:bg-lawyer-800">
                      {stat.value}
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>
              
              <Separator className="my-4" />
              
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-lawyer-800">Ações rápidas</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Type className="mr-2 h-4 w-4" />
                    Fontes
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Image className="mr-2 h-4 w-4" />
                    Mídias
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    Usuários
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Suporte
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6"
          >
            <Card className="bg-gradient-to-br from-lawyer-800 to-lawyer-900 text-white border-0 shadow-lg overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Dica do dia</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-lawyer-100">
                  Utilize imagens de alta qualidade e otimizadas para web para melhorar 
                  o desempenho e a aparência do seu site.
                </p>
                <Button variant="ghost" className="mt-4 text-white hover:bg-white/10 p-0">
                  <span>Ver mais dicas</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
              <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-full h-full"
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1"
                >
                  <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            </Card>
          </motion.div>
        </motion.div>
        
        {/* Main Editor Area */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="col-span-1 lg:col-span-9"
        >
          <Card className="border-0 shadow-md bg-white overflow-hidden">
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="w-full grid grid-cols-5 rounded-none border-b bg-gray-50">
                <TabsTrigger 
                  value="hero"
                  className="data-[state=active]:bg-white rounded-b-none data-[state=active]:border-b-2 data-[state=active]:border-lawyer-700 transition-all"
                >
                  Hero
                </TabsTrigger>
                <TabsTrigger 
                  value="benefits"
                  className="data-[state=active]:bg-white rounded-b-none data-[state=active]:border-b-2 data-[state=active]:border-lawyer-700 transition-all"
                >
                  Benefícios
                </TabsTrigger>
                <TabsTrigger 
                  value="features"
                  className="data-[state=active]:bg-white rounded-b-none data-[state=active]:border-b-2 data-[state=active]:border-lawyer-700 transition-all"
                >
                  Funcionalidades
                </TabsTrigger>
                <TabsTrigger 
                  value="testimonials"
                  className="data-[state=active]:bg-white rounded-b-none data-[state=active]:border-b-2 data-[state=active]:border-lawyer-700 transition-all"
                >
                  Depoimentos
                </TabsTrigger>
                <TabsTrigger 
                  value="footer"
                  className="data-[state=active]:bg-white rounded-b-none data-[state=active]:border-b-2 data-[state=active]:border-lawyer-700 transition-all"
                >
                  Rodapé
                </TabsTrigger>
              </TabsList>

              {/* Hero Section Tab */}
              <TabsContent value="hero" className="p-0">
                <div className="p-6 bg-gradient-to-b from-white to-gray-50">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="hero-title" className="text-lawyer-800 font-medium">Título</Label>
                      <Input 
                        id="hero-title" 
                        name="title" 
                        value={siteContent.hero.title} 
                        onChange={handleHeroChange}
                        className="border-gray-300 focus-visible:ring-lawyer-700"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hero-subtitle" className="text-lawyer-800 font-medium">Subtítulo</Label>
                      <Textarea 
                        id="hero-subtitle" 
                        name="subtitle" 
                        value={siteContent.hero.subtitle} 
                        onChange={handleHeroChange}
                        rows={3}
                        className="border-gray-300 focus-visible:ring-lawyer-700"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hero-cta" className="text-lawyer-800 font-medium">Texto do Botão</Label>
                      <Input 
                        id="hero-cta" 
                        name="ctaText" 
                        value={siteContent.hero.ctaText} 
                        onChange={handleHeroChange}
                        className="border-gray-300 focus-visible:ring-lawyer-700"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-lawyer-800 font-medium">Imagem do Hero</Label>
                      <motion.div 
                        whileHover={{ scale: 1.01, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                        className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <Image className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="mt-2">
                          <Button variant="outline" className="bg-white hover:bg-lawyer-50 border-lawyer-300 hover:border-lawyer-500 transition-colors">
                            Alterar Imagem
                          </Button>
                        </div>
                      </motion.div>
                    </div>
                    
                    {/* Hero Preview */}
                    {showPreview && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 border rounded-lg overflow-hidden shadow-md"
                      >
                        <div className="bg-gray-100 p-2 border-b flex items-center">
                          <div className="flex space-x-1 mr-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          </div>
                          <div className="text-xs text-gray-500">Visualização do Hero</div>
                        </div>
                        <div className="bg-gray-800 text-white p-8 text-center">
                          <h2 className="text-2xl font-bold mb-4">{siteContent.hero.title}</h2>
                          <p className="mb-6">{siteContent.hero.subtitle}</p>
                          <Button>{siteContent.hero.ctaText}</Button>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              </TabsContent>

              {/* Benefits Tab */}
              <TabsContent value="benefits" className="p-0">
                <div className="p-6 bg-gradient-to-b from-white to-gray-50">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <Label className="text-lawyer-800 font-medium">Título da Seção</Label>
                      <Input 
                        value={siteContent.benefits.title} 
                        onChange={(e) => setSiteContent({
                          ...siteContent,
                          benefits: { ...siteContent.benefits, title: e.target.value }
                        })}
                        className="border-gray-300 focus-visible:ring-lawyer-700"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-lawyer-800 font-medium">Subtítulo da Seção</Label>
                      <Textarea 
                        value={siteContent.benefits.subtitle}
                        onChange={(e) => setSiteContent({
                          ...siteContent,
                          benefits: { ...siteContent.benefits, subtitle: e.target.value }
                        })}
                        rows={2}
                        className="border-gray-300 focus-visible:ring-lawyer-700"
                      />
                    </div>
                    
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {siteContent.benefits.items.map((benefit, index) => (
                        <motion.div 
                          key={index} 
                          variants={itemVariants}
                          className="space-y-4 p-4 border border-gray-200 rounded-lg mb-4 bg-white shadow-sm hover:shadow-md transition-shadow"
                        >
                          <h3 className="font-medium text-lawyer-800 flex items-center">
                            <span className="flex items-center justify-center bg-lawyer-100 text-lawyer-800 w-6 h-6 rounded-full mr-2">
                              {index + 1}
                            </span>
                            Benefício {index + 1}
                          </h3>
                          <div className="space-y-2">
                            <Label>Título</Label>
                            <Input 
                              value={benefit.title}
                              onChange={(e) => handleBenefitChange(index, 'title', e.target.value)}
                              className="border-gray-300 focus-visible:ring-lawyer-700"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Descrição</Label>
                            <Textarea 
                              value={benefit.description}
                              onChange={(e) => handleBenefitChange(index, 'description', e.target.value)}
                              rows={2}
                              className="border-gray-300 focus-visible:ring-lawyer-700"
                            />
                          </div>
                        </motion.div>
                      ))}
                      
                      <div className="mt-4 flex justify-center">
                        <Button 
                          variant="outline"
                          onClick={() => {
                            setSiteContent({
                              ...siteContent,
                              benefits: {
                                ...siteContent.benefits,
                                items: [
                                  ...siteContent.benefits.items,
                                  { 
                                    title: "Novo Benefício", 
                                    description: "Descrição do novo benefício para seus clientes."
                                  }
                                ]
                              }
                            });
                          }}
                          className="border-lawyer-300 text-lawyer-700 hover:bg-lawyer-50 hover:text-lawyer-800 transition-colors"
                        >
                          + Adicionar Benefício
                        </Button>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </TabsContent>

              {/* Features Tab */}
              <TabsContent value="features" className="p-0">
                <div className="p-6 bg-gradient-to-b from-white to-gray-50">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <Label className="text-lawyer-800 font-medium">Título da Seção</Label>
                      <Input 
                        value={siteContent.features.title} 
                        onChange={(e) => setSiteContent({
                          ...siteContent,
                          features: { ...siteContent.features, title: e.target.value }
                        })}
                        className="border-gray-300 focus-visible:ring-lawyer-700"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-lawyer-800 font-medium">Subtítulo da Seção</Label>
                      <Textarea 
                        value={siteContent.features.subtitle}
                        onChange={(e) => setSiteContent({
                          ...siteContent,
                          features: { ...siteContent.features, subtitle: e.target.value }
                        })}
                        rows={2}
                        className="border-gray-300 focus-visible:ring-lawyer-700"
                      />
                    </div>
                    
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      {siteContent.features.items.map((feature, index) => (
                        <motion.div 
                          key={index} 
                          variants={itemVariants}
                          className="space-y-4 p-4 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-lawyer-800">Funcionalidade {index + 1}</h3>
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-lawyer-700 text-white">
                              <BarChart3 className="h-5 w-5" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Título</Label>
                            <Input 
                              value={feature.title}
                              onChange={(e) => {
                                const updatedFeatures = [...siteContent.features.items];
                                updatedFeatures[index] = {
                                  ...updatedFeatures[index],
                                  title: e.target.value
                                };
                                setSiteContent({
                                  ...siteContent,
                                  features: {
                                    ...siteContent.features,
                                    items: updatedFeatures
                                  }
                                });
                              }}
                              className="border-gray-300 focus-visible:ring-lawyer-700"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Descrição</Label>
                            <Textarea 
                              value={feature.description}
                              onChange={(e) => {
                                const updatedFeatures = [...siteContent.features.items];
                                updatedFeatures[index] = {
                                  ...updatedFeatures[index],
                                  description: e.target.value
                                };
                                setSiteContent({
                                  ...siteContent,
                                  features: {
                                    ...siteContent.features,
                                    items: updatedFeatures
                                  }
                                });
                              }}
                              rows={2}
                              className="border-gray-300 focus-visible:ring-lawyer-700"
                            />
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                    
                    <div className="mt-4 flex justify-center">
                      <Button 
                        variant="outline"
                        onClick={() => {
                          setSiteContent({
                            ...siteContent,
                            features: {
                              ...siteContent.features,
                              items: [
                                ...siteContent.features.items,
                                { 
                                  title: "Nova Funcionalidade", 
                                  description: "Descrição da nova funcionalidade do sistema."
                                }
                              ]
                            }
                          });
                        }}
                        className="border-lawyer-300 text-lawyer-700 hover:bg-lawyer-50 hover:text-lawyer-800 transition-colors"
                      >
                        + Adicionar Funcionalidade
                      </Button>
                    </div>
                  </motion.div>
                </div>
              </TabsContent>

              {/* Other tabs (testimonials, footer) would follow the same pattern */}
              <TabsContent value="testimonials" className="p-0">
                <div className="p-6 bg-gradient-to-b from-white to-gray-50">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <Label className="text-lawyer-800 font-medium">Título da Seção</Label>
                      <Input 
                        value={siteContent.testimonials.title} 
                        onChange={(e) => setSiteContent({
                          ...siteContent,
                          testimonials: { ...siteContent.testimonials, title: e.target.value }
                        })}
                        className="border-gray-300 focus-visible:ring-lawyer-700"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-lawyer-800 font-medium">Subtítulo da Seção</Label>
                      <Textarea 
                        value={siteContent.testimonials.subtitle}
                        onChange={(e) => setSiteContent({
                          ...siteContent,
                          testimonials: { ...siteContent.testimonials, subtitle: e.target.value }
                        })}
                        rows={2}
                        className="border-gray-300 focus-visible:ring-lawyer-700"
                      />
                    </div>
                    
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {siteContent.testimonials.items.map((testimonial, index) => (
                        <motion.div 
                          key={index} 
                          variants={itemVariants}
                          className="space-y-4 p-5 border border-gray-200 rounded-lg mb-4 bg-white shadow-sm hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 rounded-full bg-lawyer-200 flex items-center justify-center text-lawyer-700 font-bold">
                              {testimonial.name.charAt(0)}
                            </div>
                            <div>
                              <h3 className="font-medium text-lawyer-800">Depoimento {index + 1}</h3>
                              <Badge variant="outline" className="text-xs font-normal">
                                Cliente
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Nome</Label>
                              <Input 
                                value={testimonial.name}
                                onChange={(e) => handleTestimonialChange(index, 'name', e.target.value)}
                                className="border-gray-300 focus-visible:ring-lawyer-700"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Cargo</Label>
                              <Input 
                                value={testimonial.role}
                                onChange={(e) => handleTestimonialChange(index, 'role', e.target.value)}
                                className="border-gray-300 focus-visible:ring-lawyer-700"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Empresa</Label>
                            <Input 
                              value={testimonial.company}
                              onChange={(e) => handleTestimonialChange(index, 'company', e.target.value)}
                              className="border-gray-300 focus-visible:ring-lawyer-700"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Depoimento</Label>
                            <Textarea 
                              value={testimonial.content}
                              onChange={(e) => handleTestimonialChange(index, 'content', e.target.value)}
                              rows={3}
                              className="border-gray-300 focus-visible:ring-lawyer-700"
                            />
                          </div>
                        </motion.div>
                      ))}
                      
                      <div className="mt-4 flex justify-center">
                        <Button 
                          variant="outline"
                          onClick={() => {
                            setSiteContent({
                              ...siteContent,
                              testimonials: {
                                ...siteContent.testimonials,
                                items: [
                                  ...siteContent.testimonials.items,
                                  { 
                                    name: "Novo Cliente", 
                                    role: "Cargo", 
                                    company: "Empresa", 
                                    content: "Depoimento do cliente sobre nossa solução." 
                                  }
                                ]
                              }
                            });
                          }}
                          className="border-lawyer-300 text-lawyer-700 hover:bg-lawyer-50 hover:text-lawyer-800 transition-colors"
                        >
                          + Adicionar Depoimento
                        </Button>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </TabsContent>

              <TabsContent value="footer" className="p-0">
                <div className="p-6 bg-gradient-to-b from-white to-gray-50">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="developer-name" className="text-lawyer-800 font-medium">Nome do Desenvolvedor</Label>
                      <Input 
                        id="developer-name"
                        value={siteContent.footer.developerName}
                        onChange={(e) => setSiteContent({
                          ...siteContent,
                          footer: { 
                            ...siteContent.footer, 
                            developerName: e.target.value 
                          }
                        })}
                        className="border-gray-300 focus-visible:ring-lawyer-700"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="developer-url" className="text-lawyer-800 font-medium">URL do Desenvolvedor</Label>
                      <Input 
                        id="developer-url"
                        value={siteContent.footer.developerUrl}
                        onChange={(e) => setSiteContent({
                          ...siteContent,
                          footer: { 
                            ...siteContent.footer, 
                            developerUrl: e.target.value 
                          }
                        })}
                        className="border-gray-300 focus-visible:ring-lawyer-700"
                      />
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="space-y-4">
                      <h3 className="font-medium text-lawyer-800 flex items-center">
                        <PanelLeft className="mr-2 h-4 w-4" />
                        Links Redes Sociais
                      </h3>
                      
                      <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        {siteContent.footer.socialLinks.map((link, index) => (
                          <motion.div 
                            key={index} 
                            variants={itemVariants}
                            className="grid grid-cols-2 gap-4 mb-4 p-4 border border-gray-200 rounded-lg bg-white shadow-sm"
                          >
                            <div className="space-y-2">
                              <Label>Plataforma</Label>
                              <Input 
                                value={link.platform}
                                onChange={(e) => {
                                  const updatedLinks = [...siteContent.footer.socialLinks];
                                  updatedLinks[index] = {
                                    ...updatedLinks[index],
                                    platform: e.target.value
                                  };
                                  setSiteContent({
                                    ...siteContent,
                                    footer: {
                                      ...siteContent.footer,
                                      socialLinks: updatedLinks
                                    }
                                  });
                                }}
                                className="border-gray-300 focus-visible:ring-lawyer-700"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>URL</Label>
                              <Input 
                                value={link.url}
                                onChange={(e) => {
                                  const updatedLinks = [...siteContent.footer.socialLinks];
                                  updatedLinks[index] = {
                                    ...updatedLinks[index],
                                    url: e.target.value
                                  };
                                  setSiteContent({
                                    ...siteContent,
                                    footer: {
                                      ...siteContent.footer,
                                      socialLinks: updatedLinks
                                    }
                                  });
                                }}
                                className="border-gray-300 focus-visible:ring-lawyer-700"
                              />
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                      
                      <div className="mt-4 flex justify-center">
                        <Button 
                          variant="outline"
                          onClick={() => {
                            setSiteContent({
                              ...siteContent,
                              footer: {
                                ...siteContent.footer,
                                socialLinks: [
                                  ...siteContent.footer.socialLinks,
                                  { platform: "Nova Rede", url: "#" }
                                ]
                              }
                            });
                          }}
                          className="border-lawyer-300 text-lawyer-700 hover:bg-lawyer-50 hover:text-lawyer-800 transition-colors"
                        >
                          + Adicionar Rede Social
                        </Button>
                      </div>
                    </div>
                    
                    <div className="bg-lawyer-50 p-4 rounded-lg mt-6 flex items-start">
                      <AlertCircle className="h-5 w-5 mr-2 text-lawyer-700 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-lawyer-600">
                        Alterações no rodapé serão aplicadas em todas as páginas do site. Certifique-se de que 
                        todas as informações estão corretas antes de salvar.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SiteEditor;
